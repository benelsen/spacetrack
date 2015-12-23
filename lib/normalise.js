import {compose, assoc, dissoc, slice, omit, props, reject, isNil} from 'ramda'
import {coerceArray} from './helpers'

/**
 * Data entry as returned by the Space-Track API prior to any normalisation.
 * @private
 * @typedef {Object} RawDataEntry
 */

/**
 * Data entry after normalisation.
 * @private
 * @typedef {Object} DataEntry
 */

/**
 * Reformats the date strings returned from Space-Track.
 * @private
 * @param  {string} d
 * @return {string}
 */
const normaliseDate = (d) => new Date(d).toISOString()
const normaliseDateTime = (d) => new Date(`${d}Z`).toISOString()

/**
 * Stores the mappings for the names and the type conversions or transformations to be applied to that field.
 * Fields not specified are not renamed and keep the returned (string)-value.
 * @private
 * @type {Map}
 */
const mappings = new Map()

  // tle
  .set('OBJECT_NAME', 'name')

  .set('OBJECT_ID', 'intl_designator')
  .set('INTLDES', 'intl_designator')

  .set('OBJECT_NUMBER', ['catalog_number', parseInt])
  .set('NORAD_CAT_ID', ['catalog_number', parseInt])

  .set('EPOCH', ['epoch', normaliseDateTime])
  .set('EPOCH_MICROSECONDS', ['epoch_microseconds', parseInt])

  .set('ECCENTRICITY', ['eccentricity', parseFloat])
  .set('INCLINATION', ['inclination', parseFloat])
  .set('RA_OF_ASC_NODE', ['right_ascension', parseFloat])
  .set('ARG_OF_PERICENTER', ['argument_of_periapsis', parseFloat])
  .set('MEAN_ANOMALY', ['mean_anomaly', parseFloat])
  .set('MEAN_MOTION', ['mean_motion', parseFloat])
  .set('MEAN_MOTION_DOT', ['mean_motion_dot', (x) => parseFloat(x) * 2])
  .set('MEAN_MOTION_DDOT', ['mean_motion_dot_dot', (x) => parseFloat(x) * 6])
  .set('BSTAR', ['b_star', parseFloat])

  .set('REV_AT_EPOCH', ['revolutions_at_epoch', parseInt])

  .set('EPHEMERIS_TYPE', ['ephemeris_type', parseInt])
  .set('ELEMENT_SET_NO', ['element_set_number', parseInt])
  .set('COMMENTCODE', ['comment_code', parseInt])
  .set('FILE', ['file', parseInt])

  .set('SEMIMAJOR_AXIS', ['semimajor_axis', parseFloat])
  .set('PERIOD', ['orbital_period', parseFloat])
  .set('APOGEE', ['apogee', parseFloat])
  .set('PERIGEE', ['perigee', parseFloat])

  // tle_latest
  .set('ORDINAL', ['ordinal', parseInt])

  // tle_publish
  .set('PUBLISH_EPOCH', ['publish_epoch', normaliseDateTime])

  // omm
  .set('CCSDS_OMM_VERS', 'ccsds_omm_version')
  .set('CREATION_DATE', ['creation_date', normaliseDateTime])

  .set('REF_FRAME', 'reference_frame')
  .set('CENTER_NAME', 'reference_frame_origin')
  .set('MEAN_ELEMENT_THEORY', 'element_theory')

  // boxscore
  .set('SPADOC_CD', 'spadoc_designator')

  .set('ORBITAL_TBA', ['orbital_unassigned_count', parseInt])
  .set('ORBITAL_PAYLOAD_COUNT', ['orbital_payload_count', parseInt])
  .set('ORBITAL_ROCKET_BODY_COUNT', ['orbital_rocket_body_count', parseInt])
  .set('ORBITAL_DEBRIS_COUNT', ['orbital_debris_count', parseInt])
  .set('ORBITAL_TOTAL_COUNT', ['orbital_total_count', parseInt])
  .set('DECAYED_PAYLOAD_COUNT', ['decayed_payload_count', parseInt])
  .set('DECAYED_ROCKET_BODY_COUNT', ['decayed_rocket_body_count', parseInt])
  .set('DECAYED_DEBRIS_COUNT', ['decayed_debris_count', parseInt])
  .set('DECAYED_TOTAL_COUNT', ['decayed_total_count', parseInt])
  .set('COUNTRY_TOTAL', ['orbital_unassigned_count', parseInt])

  // satcat
  .set('SATNAME', 'name')
  .set('SITE', 'launch_site_code')
  .set('LAUNCH', ['launch_date', normaliseDate])
  .set('DECAY', ['decay_date', normaliseDate])
  .set('RCSVALUE', ['rcs_value', parseInt])
  .set('RCS_SIZE', 'rcs_size')
  .set('LAUNCH_YEAR', ['launch_number', parseInt])
  .set('LAUNCH_NUM', ['launch_number', parseInt])

  .set('CURRENT', ['current', (x) => x === 'Y'])

  // launch_site
  .set('SITE_CODE', 'launch_site_code')
  .set('LAUNCH_SITE', 'launch_site')

  // satcat_change
  .set('CURRENT_NAME', 'new_name')
  .set('PREVIOUS_NAME', 'old_name')
  .set('CURRENT_INTLDES', 'new_intl_designator')
  .set('PREVIOUS_INTLDES', 'old_intl_designator')
  .set('CURRENT_COUNTRY', 'new_country')
  .set('PREVIOUS_COUNTRY', 'old_country')
  .set('CURRENT_LAUNCH', ['new_launch_date', normaliseDate])
  .set('PREVIOUS_LAUNCH', ['old_launch_date', normaliseDate])
  .set('CURRENT_DECAY', ['new_decay_date', normaliseDate])
  .set('PREVIOUS_DECAY', ['old_decay_date', normaliseDate])

  // satcat_debut
  .set('DEBUT', ['debut_date', normaliseDateTime])

  // decay
  .set('RCS', ['rcs_value', parseInt])
  .set('MSG_EPOCH', ['message_epoch', normaliseDateTime])
  .set('DECAY_EPOCH', ['decay_epoch', normaliseDateTime])
  .set('SOURCE', 'decay_source')
  .set('MSG_TYPE', 'message_type')
  .set('PRECEDENCE', ['precedence', parseInt])

  // tip
  .set('INSERT_EPOCH', ['insert_epoch', normaliseDateTime])
  .set('WINDOW', ['revolution', parseInt])
  .set('REV', ['revolution', parseInt])
  .set('LAT', ['latitude', parseFloat])
  .set('LON', ['longitude', parseFloat])
  .set('INCL', ['inclination', parseFloat])
  .set('NEXT_REPORT', ['report_id', parseInt])
  .set('ID', ['report_id', parseInt])
  .set('HIGH_INTEREST', ['high_interest', (x) => x === 'Y'])

  // announcement
  .set('announcement_start', ['announcement_start_date', normaliseDateTime])
  .set('announcement_end', ['announcement_end_date', normaliseDateTime])

  // cdm
  .set('CCSDS_CDM_VERS', 'ccsds_cdm_version')

  // organization
  .set('ORG_NAME', 'organization_name')

/**
 * Normalises a single field in a data entry by mapping from Space-Track names to more sensible names
 * and performs the transformation or type conversion stored in the mapping.
 * @private
 * @param  {string} key
 * @param  {string} value
 * @return {Object}
 */
export function normaliseField (key, value) {

  if ( mappings.has(key) ) {

    let mapping = coerceArray( mappings.get(key) )

    // If a transformation function for this key is stored apply it to the value.
    // Return a {key: value} object.
    return {
      [mapping[0]]: (mapping[1] && (mapping[1] instanceof Function) ? mapping[1](value) : value),
    }

  } else {

    return {
      [key.toLowerCase()]: value,
    }

  }

}

/**
 * Normalises a data entry, e.g. calls `normaliseField` for all fields and performs transformations.
 * @private
 * @param  {RawDataEntry} data
 * @param  {Object}       [options]
 * @return {DataEntry}
 */
export function normaliseData (data, options) {

  let normalised = Object.keys(data).reduce( (m, key) => {
    return Object.assign( m, normaliseField(key, data[key]) )
  }, {})

  if ( options.epochNormalisation && 'epoch' in normalised && 'epoch_microseconds' in normalised ) {
    normalised = normaliseEpoch(normalised, options.keepMicrosecondsField)
  }

  if ( 'tle_line0' in normalised || 'user_defined_tle_line0' in normalised) {
    normalised = normaliseTLELines(normalised)
  }

  return normalised
}

/**
 * Normalises the `epoch` and `epoch_microseconds` fields by merging them in a single `epoch` field.
 * @private
 * @param  {DataEntry} data
 * @param  {Boolean}   [keepMicrosecondsField = false]
 * @return {DataEntry}
 */
function normaliseEpoch (data, keepMicrosecondsField = false) {
  const epoch = `${ slice(0, -5, data.epoch) }.${ data.epoch_microseconds }Z`
  data = assoc('epoch', epoch, data)
  return keepMicrosecondsField ? data : dissoc('epoch_microseconds', data)
}

/**
 * List of keys of fields that contain TLE lines
 * @private
 * @type {string[]}
 */
const tleLineKeys = ['tle_line0', 'tle_line1', 'tle_line2', 'user_defined_tle_line0', 'user_defined_tle_line1', 'user_defined_tle_line2']
/**
 * Create an array from the values of fields that contain TLE lines
 * @private
 * @param  {DataEntry} data
 * @return {string[]}
 */
const extractTLELines = compose(reject(isNil), props(tleLineKeys))

/**
 * Moves fields for TLE lines into an array called `tle`
 * @private
 * @param  {DataEntry} data
 * @return {DataEntry}
 */
function normaliseTLELines (data) {
  const tle = extractTLELines(data)
  data = assoc('tle', tle, data)
  return omit(tleLineKeys, data)
}

/**
 * Normalise the data returned from the Space-Track API.
 * @param  {RawDataEntry[]} data
 * @param  {Object}         [options]
 * @return {DataEntry[]}
 */
export function normalise (data, options) {
  return data.map( x => normaliseData(x, options) )
}
export default normalise
