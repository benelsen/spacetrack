
function cleanData(result) {

  if ( !result || !result.data ) return [];

  if ( !Array.isArray( result.data) ) result.data = [result.data];

  return result.data.map(function(data) {
    /* jshint sub:true */

    var clean = {};

    if ( data['OBJECT_NAME'] || data['SATNAME'] )
      clean.name = data['OBJECT_NAME'] || data['SATNAME'];

    if ( data['OBJECT_ID'] || data['INTLDES'] )
      clean.intlDesignator = data['OBJECT_ID'] || data['INTLDES'];

    if ( data['NORAD_CAT_ID'] || data['OBJECT_NUMBER'] )
      clean.catalogNumber = data['NORAD_CAT_ID'] || data['OBJECT_NUMBER'];

    if ( data['OBJECT_TYPE'] )
      clean.type = data['OBJECT_TYPE'];

    if ( data['CLASSIFICATION_TYPE'] )
      clean.classificationType = data['CLASSIFICATION_TYPE'];

    if ( data['EPOCH'] && data['EPOCH_MICROSECONDS'] ) {
      clean.epoch = data['EPOCH'] + '.' + data['EPOCH_MICROSECONDS'] + 'Z';

    } else if ( data['EPOCH'] ) {
      clean.epoch = data['EPOCH'] + 'Z';
    }

    if ( data['ECCENTRICITY'] )
      clean.eccentricity = data['ECCENTRICITY'];

    if ( data['INCLINATION'] )
      clean.inclination = data['INCLINATION'];

    if ( data['RA_OF_ASC_NODE'] )
      clean.rightAscension = data['RA_OF_ASC_NODE'];

    if ( data['ARG_OF_PERICENTER'] )
      clean.argPericenter = data['ARG_OF_PERICENTER'];

    if ( data['MEAN_ANOMALY'] )
      clean.meanAnomaly = data['MEAN_ANOMALY'];

    if ( data['MEAN_MOTION'] )
      clean.meanMotion = data['MEAN_MOTION'];

    if ( data['MEAN_MOTION_DOT'] )
      clean.meanMotionDot = data['MEAN_MOTION_DOT'];

    if ( data['MEAN_MOTION_DDOT'] )
      clean.meanMotionDotDot = data['MEAN_MOTION_DDOT'];

    if ( data['BSTAR'] )
      clean.bStar = data['BSTAR'];

    if ( data['REV_AT_EPOCH'] )
      clean.revolutionsAtEpoch = data['REV_AT_EPOCH'];

    if ( data['REF_FRAME'] )
      clean.referenceFrame = data['REF_FRAME'];

    if ( data['CENTER_NAME'] )
      clean.referenceCenter = data['CENTER_NAME'];

    if ( data['TIME_SYSTEM'] )
      clean.timeSystem = data['TIME_SYSTEM'];

    if ( data['ELEMENT_SET_NO'] )
      clean.elementSetNumber = data['ELEMENT_SET_NO'];

    if ( data['MEAN_ELEMENT_THEORY'] )
      clean.elementTheory = data['MEAN_ELEMENT_THEORY'];

    if ( data['EPHEMERIS_TYPE'] )
      clean.ephemerisType = data['EPHEMERIS_TYPE'];

    if ( data['COMMENT'] )
      clean.comment = data['COMMENT'] || '';

    if ( data['COMMENTCODE'] )
      clean.commentCode = data['COMMENTCODE'];

    if ( data['ORIGINATOR'] )
      clean.originator = data['ORIGINATOR'];

    if ( data['ORDINAL'] )
      clean.ordinal = data['ORDINAL'];

    if ( data['FILE'] )
      clean.file = data['FILE'];

    if ( data['TLE_LINE0'] &&
         data['TLE_LINE1'] &&
         data['TLE_LINE2'] ) {
      clean.tle = [
        data['TLE_LINE0'],
        data['TLE_LINE1'],
        data['TLE_LINE2']
      ];
    }

    if ( data['USER_DEFINED_TLE_LINE0'] &&
         data['USER_DEFINED_TLE_LINE1'] &&
         data['USER_DEFINED_TLE_LINE2'] ) {
      clean.tle = [
        data['USER_DEFINED_TLE_LINE0'],
        data['USER_DEFINED_TLE_LINE1'],
        data['USER_DEFINED_TLE_LINE2']
      ];
    }

    // boxscore
    if ( data['COUNTRY'] )
      clean.country = data['COUNTRY'];

    if ( data['SPADOC_CD'] )
      clean.spadocDesignator = data['SPADOC_CD'];

    if ( data['ORBITAL_TBA'] )
      clean.orbitalTBA = data['ORBITAL_TBA'];

    if ( data['ORBITAL_PAYLOAD_COUNT'] )
      clean.orbitalPayload = data['ORBITAL_PAYLOAD_COUNT'];

    if ( data['ORBITAL_ROCKET_BODY_COUNT'] )
      clean.orbitalRocketBody = data['ORBITAL_ROCKET_BODY_COUNT'];

    if ( data['ORBITAL_DEBRIS_COUNT'] )
      clean.orbitalDebris = data['ORBITAL_DEBRIS_COUNT'];

    if ( data['ORBITAL_TOTAL_COUNT'] )
      clean.orbitalTotal = data['ORBITAL_TOTAL_COUNT'];

    if ( data['DECAYED_PAYLOAD_COUNT'] )
      clean.decayedPayload = data['DECAYED_PAYLOAD_COUNT'];

    if ( data['DECAYED_ROCKET_BODY_COUNT'] )
      clean.decayedRocketBody = data['DECAYED_ROCKET_BODY_COUNT'];

    if ( data['DECAYED_DEBRIS_COUNT'] )
      clean.decayedDebris = data['DECAYED_DEBRIS_COUNT'];

    if ( data['DECAYED_TOTAL_COUNT'] )
      clean.decayedTotal = data['DECAYED_TOTAL_COUNT'];

    if ( data['COUNTRY_TOTAL'] )
      clean.countryTotal = data['COUNTRY_TOTAL'];


    // satcat
    if ( data['COUNTRY'] )
      clean.country = data['COUNTRY'];

    if ( data['SITE'] )
      clean.launchSiteCode = data['SITE'];

    if ( data['LAUNCH'] )
      clean.launchDate = data['LAUNCH'];

    if ( data['DECAY'] )
      clean.decayDate = data['DECAY'];

    if ( data['PERIOD'] )
      clean.orbitalPeriod = data['PERIOD'];

    if ( data['APOGEE'] )
      clean.apogee = data['APOGEE'];

    if ( data['PERIGEE'] )
      clean.perigee = data['PERIGEE'];

    if ( data['RCSVALUE'] )
      clean.rcsValue = data['RCSVALUE'];

    if ( data['LAUNCH_YEAR'] )
      clean.launchYear = data['LAUNCH_YEAR'];

    if ( data['LAUNCH_NUM'] )
      clean.launchNumber = data['LAUNCH_NUM'];

    if ( data['LAUNCH_PIECE'] )
      clean.launchPiece = data['LAUNCH_PIECE'];

    if ( data['CURRENT'] )
      clean.current = data['CURRENT'] === 'Y' ? true : false;


    // launch_site
    if ( data['SITE_CODE'] )
      clean.launchSiteCode = data['SITE_CODE'];

    if ( data['LAUNCH_SITE'] )
      clean.launchSiteName = data['LAUNCH_SITE'];


    // decay
    if ( data['MSG_EPOCH'] )
      clean.messageEpoch = data['MSG_EPOCH'];

    if ( data['DECAY_EPOCH'] )
      clean.decayEpoch = data['DECAY_EPOCH'];

    if ( data['SOURCE'] )
      clean.decaySource = data['SOURCE'];

    if ( data['MSG_TYPE'] )
      clean.messageType = data['MSG_TYPE'];

    if ( data['PRECEDENCE'] )
      clean.precedence = data['PRECEDENCE'];


    // satcat_change
    if ( data['CURRENT_NAME'] )
      clean.newName = data['CURRENT_NAME'];

    if ( data['PREVIOUS_NAME'] )
      clean.oldName = data['PREVIOUS_NAME'];

    if ( data['CURRENT_INTLDES'] )
      clean.newIntlDesignator = data['CURRENT_INTLDES'];

    if ( data['PREVIOUS_INTLDES'] )
      clean.oldIntlDesignator = data['PREVIOUS_INTLDES'];

    if ( data['CURRENT_COUNTRY'] )
      clean.newCountry = data['CURRENT_COUNTRY'];

    if ( data['PREVIOUS_COUNTRY'] )
      clean.oldCountry = data['PREVIOUS_COUNTRY'];

    if ( data['CURRENT_LAUNCH'] )
      clean.newLaunchDate = data['CURRENT_LAUNCH'];

    if ( data['PREVIOUS_LAUNCH'] )
      clean.oldLaunchDate = data['PREVIOUS_NAME'];

    if ( data['CURRENT_DECAY'] )
      clean.newDecayDate = data['CURRENT_DECAY'];

    if ( data['PREVIOUS_DECAY'] )
      clean.oldDecayDate = data['PREVIOUS_DECAY'];


    // tip
    if ( data['INSERT_EPOCH'] )
      clean.insertEpoch = data['INSERT_EPOCH'];

    if ( data['WINDOW'] )
      clean.window = data['WINDOW'];

    if ( data['REV'] )
      clean.revolution = data['REV'];

    if ( data['DIRECTION'] )
      clean.direction = data['DIRECTION'];

    if ( data['LAT'] )
      clean.latitude = data['LAT'];

    if ( data['LON'] )
      clean.longitude = data['LON'];

    if ( data['INCL'] )
      clean.inclination = data['INCL'];

    if ( data['NEXT_REPORT'] )
      clean.nextReport = data['NEXT_REPORT'];

    if ( data['ID'] )
      clean.reportID = data['ID'];

    if ( data['HIGH_INTEREST'] )
      clean.highInterest = data['HIGH_INTEREST'];


    // satcat_debut
    if ( data['DEBUT'] )
      clean.debutDate = data['DEBUT'];

    return clean;

  });

}

module.exports = cleanData;
