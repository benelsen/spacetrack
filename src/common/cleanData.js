var _ = require('lodash');

function cleanData(result) {

  if ( !result || !result.data ) return [];

  if ( !_.isArray(result.data) ) result.data = [result.data];

  return result.data.map(function(data) {
    /* jshint sub:true */

    var clean = {};

    if ( data.hasOwnProperty('OBJECT_NAME') || data.hasOwnProperty('SATNAME') ) clean.name = data['OBJECT_NAME'] || data['SATNAME'];

    if ( data.hasOwnProperty('OBJECT_ID') || data.hasOwnProperty('INTLDES') ) clean.intlDesignator = data['OBJECT_ID'] || data['INTLDES'];

    if ( data.hasOwnProperty('NORAD_CAT_ID') || data.hasOwnProperty('OBJECT_NUMBER') ) clean.catalogNumber = data['NORAD_CAT_ID'] || data['OBJECT_NUMBER'];

    if ( data.hasOwnProperty('OBJECT_TYPE') ) clean.type = data['OBJECT_TYPE'];
    if ( data.hasOwnProperty('CLASSIFICATION_TYPE') ) clean.classificationType = data['CLASSIFICATION_TYPE'];

    if ( data.hasOwnProperty('EPOCH') && data.hasOwnProperty('EPOCH_MICROSECONDS') ) {
      clean.epoch = data['EPOCH'] + '.' + data['EPOCH_MICROSECONDS'] + 'Z';
    } else if ( data.hasOwnProperty('EPOCH') ) {
      clean.epoch = data['EPOCH'] + 'Z';
    }

    if ( data.hasOwnProperty('ECCENTRICITY') ) clean.eccentricity = data['ECCENTRICITY'];
    if ( data.hasOwnProperty('INCLINATION') ) clean.inclination = data['INCLINATION'];

    if ( data.hasOwnProperty('RA_OF_ASC_NODE') ) clean.rightAscension = data['RA_OF_ASC_NODE'];
    if ( data.hasOwnProperty('ARG_OF_PERICENTER') ) clean.argPericenter = data['ARG_OF_PERICENTER'];

    if ( data.hasOwnProperty('MEAN_ANOMALY') ) clean.meanAnomaly = data['MEAN_ANOMALY'];

    if ( data.hasOwnProperty('MEAN_MOTION') ) clean.meanMotion = data['MEAN_MOTION'];
    if ( data.hasOwnProperty('MEAN_MOTION_DOT') ) clean.meanMotionDot = data['MEAN_MOTION_DOT'];
    if ( data.hasOwnProperty('MEAN_MOTION_DDOT') ) clean.meanMotionDotDot = data['MEAN_MOTION_DDOT'];

    if ( data.hasOwnProperty('BSTAR') ) clean.bStar = data['BSTAR'];

    if ( data.hasOwnProperty('REV_AT_EPOCH') ) clean.revolutionsAtEpoch = data['REV_AT_EPOCH'];

    if ( data.hasOwnProperty('REF_FRAME') ) clean.referenceFrame = data['REF_FRAME'];
    if ( data.hasOwnProperty('CENTER_NAME') ) clean.referenceCenter = data['CENTER_NAME'];
    if ( data.hasOwnProperty('TIME_SYSTEM') ) clean.timeSystem = data['TIME_SYSTEM'];

    if ( data.hasOwnProperty('ELEMENT_SET_NO') ) clean.elementSetNumber = data['ELEMENT_SET_NO'];
    if ( data.hasOwnProperty('MEAN_ELEMENT_THEORY') ) clean.elementTheory = data['MEAN_ELEMENT_THEORY'];
    if ( data.hasOwnProperty('EPHEMERIS_TYPE') ) clean.ephemerisType = data['EPHEMERIS_TYPE'];

    if ( data.hasOwnProperty('COMMENT') ) clean.comment = data['COMMENT'] || '';
    if ( data.hasOwnProperty('COMMENTCODE') ) clean.commentCode = data['COMMENTCODE'];

    if ( data.hasOwnProperty('ORIGINATOR') ) clean.originator = data['ORIGINATOR'];

    if ( data.hasOwnProperty('ORDINAL') ) clean.ordinal = data['ORDINAL'];
    if ( data.hasOwnProperty('FILE') ) clean.file = data['FILE'];

    if ( data.hasOwnProperty('TLE_LINE0') &&
         data.hasOwnProperty('TLE_LINE1') &&
         data.hasOwnProperty('TLE_LINE2') ) {
      clean.tle = [
        data['TLE_LINE0'],
        data['TLE_LINE1'],
        data['TLE_LINE2']
      ];
    }

    if ( data.hasOwnProperty('USER_DEFINED_TLE_LINE0') &&
         data.hasOwnProperty('USER_DEFINED_TLE_LINE1') &&
         data.hasOwnProperty('USER_DEFINED_TLE_LINE2') ) {
      clean.tle = [
        data['USER_DEFINED_TLE_LINE0'],
        data['USER_DEFINED_TLE_LINE1'],
        data['USER_DEFINED_TLE_LINE2']
      ];
    }

    // boxscore
    if ( data.hasOwnProperty('COUNTRY') ) clean.country = data['COUNTRY'];
    if ( data.hasOwnProperty('SPADOC_CD') ) clean.spadocDesignator = data['SPADOC_CD'];
    if ( data.hasOwnProperty('ORBITAL_TBA') ) clean.orbitalTBA = data['ORBITAL_TBA'];
    if ( data.hasOwnProperty('ORBITAL_PAYLOAD_COUNT') ) clean.orbitalPayload = data['ORBITAL_PAYLOAD_COUNT'];
    if ( data.hasOwnProperty('ORBITAL_ROCKET_BODY_COUNT') ) clean.orbitalRocketBody = data['ORBITAL_ROCKET_BODY_COUNT'];
    if ( data.hasOwnProperty('ORBITAL_DEBRIS_COUNT') ) clean.orbitalDebris = data['ORBITAL_DEBRIS_COUNT'];
    if ( data.hasOwnProperty('ORBITAL_TOTAL_COUNT') ) clean.orbitalTotal = data['ORBITAL_TOTAL_COUNT'];
    if ( data.hasOwnProperty('DECAYED_PAYLOAD_COUNT') ) clean.decayedPayload = data['DECAYED_PAYLOAD_COUNT'];
    if ( data.hasOwnProperty('DECAYED_ROCKET_BODY_COUNT') ) clean.decayedRocketBody = data['DECAYED_ROCKET_BODY_COUNT'];
    if ( data.hasOwnProperty('DECAYED_DEBRIS_COUNT') ) clean.decayedDebris = data['DECAYED_DEBRIS_COUNT'];
    if ( data.hasOwnProperty('DECAYED_TOTAL_COUNT') ) clean.decayedTotal = data['DECAYED_TOTAL_COUNT'];
    if ( data.hasOwnProperty('COUNTRY_TOTAL') ) clean.countryTotal = data['COUNTRY_TOTAL'];

    // satcat
    if ( data.hasOwnProperty('COUNTRY') ) clean.country = data['COUNTRY'];
    if ( data.hasOwnProperty('SITE') ) clean.launchSiteCode = data['SITE'];

    if ( data.hasOwnProperty('LAUNCH') ) clean.launchDate = data['LAUNCH'];
    if ( data.hasOwnProperty('DECAY') ) clean.decayDate = data['DECAY'];

    if ( data.hasOwnProperty('PERIOD') ) clean.orbitalPeriod = data['PERIOD'];
    if ( data.hasOwnProperty('APOGEE') ) clean.apogee = data['APOGEE'];
    if ( data.hasOwnProperty('PERIGEE') ) clean.perigee = data['PERIGEE'];

    if ( data.hasOwnProperty('RCSVALUE') ) clean.rcsValue = data['RCSVALUE'];

    if ( data.hasOwnProperty('LAUNCH_YEAR') ) clean.launchYear = data['LAUNCH_YEAR'];
    if ( data.hasOwnProperty('LAUNCH_NUM') ) clean.launchNumber = data['LAUNCH_NUM'];
    if ( data.hasOwnProperty('LAUNCH_PIECE') ) clean.launchPiece = data['LAUNCH_PIECE'];

    if ( data.hasOwnProperty('CURRENT') ) clean.current = data['CURRENT'] === 'Y' ? true : false;

    // launch_site
    if ( data.hasOwnProperty('SITE_CODE') ) clean.launchSiteCode = data['SITE_CODE'];
    if ( data.hasOwnProperty('LAUNCH_SITE') ) clean.launchSiteName = data['LAUNCH_SITE'];

    // decay
    if ( data.hasOwnProperty('MSG_EPOCH') ) clean.messageEpoch = data['MSG_EPOCH'];
    if ( data.hasOwnProperty('DECAY_EPOCH') ) clean.decayEpoch = data['DECAY_EPOCH'];
    if ( data.hasOwnProperty('SOURCE') ) clean.decaySource = data['SOURCE'];
    if ( data.hasOwnProperty('MSG_TYPE') ) clean.messageType = data['MSG_TYPE'];
    if ( data.hasOwnProperty('PRECEDENCE') ) clean.precedence = data['PRECEDENCE'];

    // satcat_change
    if ( data.hasOwnProperty('CURRENT_NAME') ) clean.newName = data['CURRENT_NAME'];
    if ( data.hasOwnProperty('PREVIOUS_NAME') ) clean.oldName = data['PREVIOUS_NAME'];
    if ( data.hasOwnProperty('CURRENT_INTLDES') ) clean.newIntlDesignator = data['CURRENT_INTLDES'];
    if ( data.hasOwnProperty('PREVIOUS_INTLDES') ) clean.oldIntlDesignator = data['PREVIOUS_INTLDES'];
    if ( data.hasOwnProperty('CURRENT_COUNTRY') ) clean.newCountry = data['CURRENT_COUNTRY'];
    if ( data.hasOwnProperty('PREVIOUS_COUNTRY') ) clean.oldCountry = data['PREVIOUS_COUNTRY'];
    if ( data.hasOwnProperty('CURRENT_LAUNCH') ) clean.newLaunchDate = data['CURRENT_LAUNCH'];
    if ( data.hasOwnProperty('PREVIOUS_LAUNCH') ) clean.oldLaunchDate = data['PREVIOUS_NAME'];
    if ( data.hasOwnProperty('CURRENT_DECAY') ) clean.newDecayDate = data['CURRENT_DECAY'];
    if ( data.hasOwnProperty('PREVIOUS_DECAY') ) clean.oldDecayDate = data['PREVIOUS_DECAY'];

    // tip
    if ( data.hasOwnProperty('INSERT_EPOCH') ) clean.insertEpoch = data['INSERT_EPOCH'];
    if ( data.hasOwnProperty('WINDOW') ) clean.window = data['WINDOW'];
    if ( data.hasOwnProperty('REV') ) clean.revolution = data['REV'];
    if ( data.hasOwnProperty('DIRECTION') ) clean.direction = data['DIRECTION'];
    if ( data.hasOwnProperty('LAT') ) clean.latitude = data['LAT'];
    if ( data.hasOwnProperty('LON') ) clean.longitude = data['LON'];
    if ( data.hasOwnProperty('INCL') ) clean.inclination = data['INCL'];
    if ( data.hasOwnProperty('NEXT_REPORT') ) clean.nextReport = data['NEXT_REPORT'];
    if ( data.hasOwnProperty('ID') ) clean.reportID = data['ID'];
    if ( data.hasOwnProperty('HIGH_INTEREST') ) clean.highInterest = data['HIGH_INTEREST'];

    // satcat_debut
    if ( data.hasOwnProperty('DEBUT') ) clean.debutDate = data['DEBUT'];

    return clean;

  });

}

module.exports = cleanData;
