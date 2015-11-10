
const normaliseDate = (d) => new Date(`${d}Z`).toISOString()

const mappings = new Map()

  // tle
  .set('OBJECT_NAME', 'name')

  .set('OBJECT_ID', 'intl_designator')
  .set('INTLDES', 'intl_designator')

  .set('OBJECT_NUMBER', ['catalog_number', parseInt])
  .set('NORAD_CAT_ID', ['catalog_number', parseInt])

  .set('ECCENTRICITY', ['eccentricity', parseFloat])
  .set('INCLINATION', ['inclination', parseFloat])
  .set('RA_OF_ASC_NODE', ['right_ascension', parseFloat])
  .set('ARG_OF_PERICENTER', ['arg_pericenter', parseFloat])
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
  .set('PUBLISH_EPOCH', ['publish_epoch', normaliseDate])

  // omm
  .set('CCSDS_OMM_VERS', 'ccsds_omm_version')
  .set('CREATION_DATE', ['creation_date', normaliseDate])

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
  .set('DEBUT', ['debut_date', normaliseDate])

  // decay
  .set('RCS', ['rcs_value', parseInt])
  .set('MSG_EPOCH', ['message_epoch', normaliseDate])
  .set('DECAY_EPOCH', ['decay_epoch', normaliseDate])
  .set('SOURCE', 'decay_source')
  .set('MSG_TYPE', 'message_type')
  .set('PRECEDENCE', ['precedence', parseInt])

  // tip
  .set('INSERT_EPOCH', ['insert_epoch', normaliseDate])
  .set('WINDOW', ['revolution', parseInt])
  .set('REV', ['revolution', parseInt])
  .set('LAT', ['latitude', parseFloat])
  .set('LON', ['longitude', parseFloat])
  .set('INCL', ['inclination', parseFloat])
  .set('NEXT_REPORT', ['report_id', parseInt])
  .set('ID', ['report_id', parseInt])
  .set('HIGH_INTEREST', ['high_interest', (x) => x === 'Y'])

  // announcement
  .set('announcement_start', ['announcement_start_date', normaliseDate])
  .set('announcement_end', ['announcement_end_date', normaliseDate])

  // cdm
  .set('CCSDS_CDM_VERS', 'ccsds_cdm_version')

  // organization
  .set('ORG_NAME', 'organization_name')

export function normaliseField (key, value) {

  console.log(key, value)

  if ( mappings.has(key) ) {

    let mapping = mappings.get(key)

    if ( !Array.isArray(mapping) ) {
      mapping = [mapping]
    }

    return {
      [mapping[0]]: mapping[1] && (parseInt instanceof Function) ? mapping[1](value) : value
    }

  } else {

    return {
      [key.toLowerCase()]: value
    }

  }

}

export default function normaliseData ( data ) {

  return Object.keys(data).reduce( (m, key) => {

    return Object.assign( m, normaliseField(key, data[key]) )

  }, {})

}

console.log( normaliseData({
  "COMMENT": "GENERATED VIA SPACETRACK.ORG API",
  "ORIGINATOR": "JSPOC",
  "NORAD_CAT_ID": "25544",
  "OBJECT_NAME": "ISS (ZARYA)",
  "OBJECT_TYPE": "PAYLOAD",
  "CLASSIFICATION_TYPE": "U",
  "INTLDES": "98067A",
  "EPOCH": "2015-11-02 07:57:25",
  "EPOCH_MICROSECONDS": "488864",
  "MEAN_MOTION": "15.54757498",
  "ECCENTRICITY": "0.0006754",
  "INCLINATION": "51.6441",
  "RA_OF_ASC_NODE": "114.6139",
  "ARG_OF_PERICENTER": "101.702",
  "MEAN_ANOMALY": "328.742",
  "EPHEMERIS_TYPE": "0",
  "ELEMENT_SET_NO": "999",
  "REV_AT_EPOCH": "96953",
  "BSTAR": "0.00015416",
  "MEAN_MOTION_DOT": "9.977e-05",
  "MEAN_MOTION_DDOT": "0",
  "FILE": "1948182",
  "TLE_LINE0": "0 ISS (ZARYA)",
  "TLE_LINE1": "1 25544U 98067A   15306.33154501  .00009977  00000-0  15416-3 0  9999",
  "TLE_LINE2": "2 25544  51.6441 114.6139 0006754 101.7020 328.7420 15.54757498969534",
  "OBJECT_ID": "1998-067A",
  "OBJECT_NUMBER": "25544",
  "SEMIMAJOR_AXIS": "6780.994",
  "PERIOD": "92.618",
  "APOGEE": "407.439",
  "PERIGEE": "398.279"
}) )
