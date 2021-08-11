/**
       * Formule mathématique pour le calcul de distance entre 2 points A et B sur terre avec lat et lng,
       * 6371 est le rayon de la terre en km :
       *
       * x = (lngB - lngA) * cos((latA + latB)/2)
       * y = latA - latB
       * distance = sqrt(pow(x) + pow(y)) * 6371
       *
       * mais /!\ il faut convertir et remplacer les lat et lng en radian :
       * latInRad = lat * pi() / 180
       * lngInRad = lng * pi() / 180
       *
       * besoin d'utiliser une sous requete avec alias pour calcul et recup la distance :
       * https://sql.sh/cours/sous-requete
       *
       * ADAPTATION SQL :
       */

const distanceCalculSQL = (lat, lng) => {
    console.log('------------------------------LAT', lat);
    return (
        `(
        SELECT (
            SQRT(
            POW (
                (("lng" * pi() / 180) - ( ${lng} * pi() / 180))
                * COS((( "lat" * pi() / 180) + ( ${lat} * pi() / 180)) / 2), 2
                ) 
                + POW (
                ("lat" * pi() / 180) - ( ${lat} * pi() / 180), 2
                )
            ) * 6371
            )
            FROM activity_place
            WHERE activity_place_id = activity_place.id
        )`
    );
};

module.exports = { distanceCalculSQL };
