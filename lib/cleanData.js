
export default function cleanData (result) {

  if ( !result || !result.data ) {
    return []
  }

  if ( !Array.isArray( result.data) ) {
    result.data = [result.data]
  }

  return result.data.map(function(data) {

    var clean = {}

    if ( data['OBJECT_NAME'] || data['SATNAME'] )
      clean.name = data['OBJECT_NAME'] || data['SATNAME']

    if ( data['OBJECT_ID'] || data['INTLDES'] )
      clean.intl_designator = data['OBJECT_ID'] || data['INTLDES']

    if ( data['NORAD_CAT_ID'] || data['OBJECT_NUMBER'] )
      clean.catalog_number = data['NORAD_CAT_ID'] || data['OBJECT_NUMBER']

    if ( data['OBJECT_TYPE'] )
      clean.type = data['OBJECT_TYPE']

    if ( data['CLASSIFICATION_TYPE'] )
      clean.classification_type = data['CLASSIFICATION_TYPE']

    if ( data['EPOCH'] && data['EPOCH_MICROSECONDS'] ) {
      clean.epoch = data['EPOCH'] + '.' + data['EPOCH_MICROSECONDS'] + 'Z'

    } else if ( data['EPOCH'] ) {
      clean.epoch = data['EPOCH'] + 'Z'
    }

    if ( data['ECCENTRICITY'] )
      clean.eccentricity = data['ECCENTRICITY']

    if ( data['INCLINATION'] )
      clean.inclination = data['INCLINATION']

    if ( data['RA_OF_ASC_NODE'] )
      clean.right_ascension = data['RA_OF_ASC_NODE']

    if ( data['ARG_OF_PERICENTER'] )
      clean.arg_pericenter = data['ARG_OF_PERICENTER']

    if ( data['MEAN_ANOMALY'] )
      clean.mean_anomaly = data['MEAN_ANOMALY']

    if ( data['MEAN_MOTION'] )
      clean.mean_motion = data['MEAN_MOTION']

    if ( data['MEAN_MOTION_DOT'] )
      clean.mean_motion_dot = data['MEAN_MOTION_DOT']

    if ( data['MEAN_MOTION_DDOT'] )
      clean.mean_motion_dot_dot = data['MEAN_MOTION_DDOT']

    if ( data['BSTAR'] )
      clean.b_star = data['BSTAR']

    if ( data['REV_AT_EPOCH'] )
      clean.revolutions_at_epoch = data['REV_AT_EPOCH']

    if ( data['REF_FRAME'] )
      clean.reference_frame = data['REF_FRAME']

    if ( data['CENTER_NAME'] )
      clean.reference_center = data['CENTER_NAME']

    if ( data['TIME_SYSTEM'] )
      clean.time_system = data['TIME_SYSTEM']

    if ( data['ELEMENT_SET_NO'] )
      clean.element_set_number = data['ELEMENT_SET_NO']

    if ( data['MEAN_ELEMENT_THEORY'] )
      clean.element_theory = data['MEAN_ELEMENT_THEORY']

    if ( data['EPHEMERIS_TYPE'] )
      clean.ephemeris_type = data['EPHEMERIS_TYPE']

    if ( data['COMMENT'] )
      clean.comment = data['COMMENT'] || ''

    if ( data['COMMENTCODE'] )
      clean.comment_code = data['COMMENTCODE']

    if ( data['ORIGINATOR'] )
      clean.originator = data['ORIGINATOR']

    if ( data['ORDINAL'] )
      clean.ordinal = data['ORDINAL']

    if ( data['FILE'] )
      clean.file = data['FILE']

    if ( data['TLE_LINE0'] &&
         data['TLE_LINE1'] &&
         data['TLE_LINE2'] ) {
      clean.tle = [
        data['TLE_LINE0'],
        data['TLE_LINE1'],
        data['TLE_LINE2']
      ]
    }

    if ( data['USER_DEFINED_TLE_LINE0'] &&
         data['USER_DEFINED_TLE_LINE1'] &&
         data['USER_DEFINED_TLE_LINE2'] ) {
      clean.tle = [
        data['USER_DEFINED_TLE_LINE0'],
        data['USER_DEFINED_TLE_LINE1'],
        data['USER_DEFINED_TLE_LINE2']
      ]
    }

    // boxscore
    if ( data['COUNTRY'] )
      clean.country = data['COUNTRY']

    if ( data['SPADOC_CD'] )
      clean.spadoc_designator = data['SPADOC_CD']

    if ( data['ORBITAL_TBA'] )
      clean.orbital_t_b_a = data['ORBITAL_TBA']

    if ( data['ORBITAL_PAYLOAD_COUNT'] )
      clean.orbital_payload = data['ORBITAL_PAYLOAD_COUNT']

    if ( data['ORBITAL_ROCKET_BODY_COUNT'] )
      clean.orbital_rocket_body = data['ORBITAL_ROCKET_BODY_COUNT']

    if ( data['ORBITAL_DEBRIS_COUNT'] )
      clean.orbital_debris = data['ORBITAL_DEBRIS_COUNT']

    if ( data['ORBITAL_TOTAL_COUNT'] )
      clean.orbital_total = data['ORBITAL_TOTAL_COUNT']

    if ( data['DECAYED_PAYLOAD_COUNT'] )
      clean.decayed_payload = data['DECAYED_PAYLOAD_COUNT']

    if ( data['DECAYED_ROCKET_BODY_COUNT'] )
      clean.decayed_rocket_body = data['DECAYED_ROCKET_BODY_COUNT']

    if ( data['DECAYED_DEBRIS_COUNT'] )
      clean.decayed_debris = data['DECAYED_DEBRIS_COUNT']

    if ( data['DECAYED_TOTAL_COUNT'] )
      clean.decayed_total = data['DECAYED_TOTAL_COUNT']

    if ( data['COUNTRY_TOTAL'] )
      clean.country_total = data['COUNTRY_TOTAL']


    // satcat
    if ( data['COUNTRY'] )
      clean.country = data['COUNTRY']

    if ( data['SITE'] )
      clean.launch_site_code = data['SITE']

    if ( data['LAUNCH'] )
      clean.launch_date = data['LAUNCH']

    if ( data['DECAY'] )
      clean.decay_date = data['DECAY']

    if ( data['PERIOD'] )
      clean.orbital_period = data['PERIOD']

    if ( data['APOGEE'] )
      clean.apogee = data['APOGEE']

    if ( data['PERIGEE'] )
      clean.perigee = data['PERIGEE']

    if ( data['RCSVALUE'] )
      clean.rcs_value = data['RCSVALUE']

    if ( data['LAUNCH_YEAR'] )
      clean.launch_year = data['LAUNCH_YEAR']

    if ( data['LAUNCH_NUM'] )
      clean.launch_number = data['LAUNCH_NUM']

    if ( data['LAUNCH_PIECE'] )
      clean.launch_piece = data['LAUNCH_PIECE']

    if ( data['CURRENT'] )
      clean.current = data['CURRENT'] === 'Y' ? true : false


    // launch_site
    if ( data['SITE_CODE'] )
      clean.launch_site_code = data['SITE_CODE']

    if ( data['LAUNCH_SITE'] )
      clean.launch_site_name = data['LAUNCH_SITE']


    // decay
    if ( data['MSG_EPOCH'] )
      clean.message_epoch = data['MSG_EPOCH']

    if ( data['DECAY_EPOCH'] )
      clean.decay_epoch = data['DECAY_EPOCH']

    if ( data['SOURCE'] )
      clean.decay_source = data['SOURCE']

    if ( data['MSG_TYPE'] )
      clean.message_type = data['MSG_TYPE']

    if ( data['PRECEDENCE'] )
      clean.precedence = data['PRECEDENCE']


    // satcat_change
    if ( data['CURRENT_NAME'] )
      clean.new_name = data['CURRENT_NAME']

    if ( data['PREVIOUS_NAME'] )
      clean.old_name = data['PREVIOUS_NAME']

    if ( data['CURRENT_INTLDES'] )
      clean.new_intl_designator = data['CURRENT_INTLDES']

    if ( data['PREVIOUS_INTLDES'] )
      clean.old_intl_designator = data['PREVIOUS_INTLDES']

    if ( data['CURRENT_COUNTRY'] )
      clean.new_country = data['CURRENT_COUNTRY']

    if ( data['PREVIOUS_COUNTRY'] )
      clean.old_country = data['PREVIOUS_COUNTRY']

    if ( data['CURRENT_LAUNCH'] )
      clean.new_launch_date = data['CURRENT_LAUNCH']

    if ( data['PREVIOUS_LAUNCH'] )
      clean.old_launch_date = data['PREVIOUS_NAME']

    if ( data['CURRENT_DECAY'] )
      clean.new_decay_date = data['CURRENT_DECAY']

    if ( data['PREVIOUS_DECAY'] )
      clean.old_decay_date = data['PREVIOUS_DECAY']


    // tip
    if ( data['INSERT_EPOCH'] )
      clean.insert_epoch = data['INSERT_EPOCH']

    if ( data['WINDOW'] )
      clean.window = data['WINDOW']

    if ( data['REV'] )
      clean.revolution = data['REV']

    if ( data['DIRECTION'] )
      clean.direction = data['DIRECTION']

    if ( data['LAT'] )
      clean.latitude = data['LAT']

    if ( data['LON'] )
      clean.longitude = data['LON']

    if ( data['INCL'] )
      clean.inclination = data['INCL']

    if ( data['NEXT_REPORT'] )
      clean.next_report = data['NEXT_REPORT']

    if ( data['ID'] )
      clean.report_id = data['ID']

    if ( data['HIGH_INTEREST'] )
      clean.high_interest = data['HIGH_INTEREST']


    // satcat_debut
    if ( data['DEBUT'] )
      clean.debut_date = data['DEBUT']

    return clean

  })

}
