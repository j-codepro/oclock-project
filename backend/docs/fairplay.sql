 
BEGIN;

DROP TABLE IF EXISTS "user_has_activity", "user_has_sport", "user", "activity", "sport", "message", "user_place", "user_grade", "activity_statut", "activity_place";

CREATE TABLE "sport" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "icon" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity_place" (
    "id" SERIAL PRIMARY KEY,
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT DEFAULT '',
    "zip_code" TEXT DEFAULT '',
    "department" TEXT DEFAULT '',
    "region" TEXT DEFAULT '',
    "google_place_key" TEXT DEFAULT '',
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "private" BOOLEAN DEFAULT 'false',
    "indoor" BOOLEAN DEFAULT 'false',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_grade" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "point" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_place" (
    "id" SERIAL PRIMARY KEY,
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "zip_code" TEXT NOT NULL DEFAULT '',
    "department" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',
    "google_place_key" TEXT NOT NULL DEFAULT '',
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL DEFAULT '',
    "pseudo" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "lastname" TEXT NOT NULL DEFAULT '',
    "firstname" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT NOT NULL DEFAULT '',
    "reward_count" INTEGER NOT NULL DEFAULT 0,
    "admin" BOOLEAN DEFAULT 'false',
    "user_grade_id" INTEGER NOT NULL REFERENCES user_grade("id"),
    "user_place_id" INTEGER NOT NULL REFERENCES user_place("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity_statut" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "illustration" TEXT DEFAULT '',
    "date" DATE,
    "time" TIME,
    "duration" TIME DEFAULT '01:00',
    "participant_count" INTEGER DEFAULT 0,
    "min_participant" INTEGER DEFAULT 0,
    "creator_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "activity_place_id" INTEGER NOT NULL REFERENCES activity_place("id"),
    "activity_status_id" INTEGER NOT NULL REFERENCES activity_statut("id"),
    "sport_id" INTEGER NOT NULL REFERENCES sport("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "message" (
    "id" SERIAL PRIMARY KEY,
    "comment" TEXT NOT NULL DEFAULT '',
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "activity_id" INTEGER NOT NULL REFERENCES activity("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_sport" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id"), 
  "sport_id" INTEGER NOT NULL REFERENCES sport("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "user_has_activity" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
  "activity_id" INTEGER NOT NULL REFERENCES activity("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO "sport" ("name", "icon") VALUES
('foot', 'foot'),
('tennis', 'tennis'),
('randonnee', 'randonnee'),
('yoga', 'yoga'),
('velo', 'velo'),
('footing', 'footing'),
('escalade', 'escalade'),
('basketball', 'basketball'),
('fitness', 'fitness');


INSERT INTO "activity_place" ("address", "city", "zip_code", "department", "region", "google_place_key", "lat", "lng", "private", "indoor") VALUES
('38 Rue René Alazard', 'Bagnolet', '93170', 'Seine-Saint-Denis', 'Ile-de-France', 'ChIJX-N1XXNt5kcRZM_FklimsmQ', 48.87370931491529, 2.4195904982846748, true, true), 
('10 Place de la Comédie', 'Montpellier', '34000', 'Hérault', 'Occitanie','ChIJmwSMR6evthIReIYsyxaF9qs', 43.609406065437526, 3.879749211605195, false, false),
('Promenade du Peyrou', 'Montpellier', '34000', 'Hérault', 'Occitanie', 'ChIJtW9UagevthIRqBfgUffh-TQ', 43.61125, 3.8707581, true, true),
('Antigone', 'Montpellier', '34000', 'Hérault', 'Occitanie','ChIJmwSMR6evthIReIYsyxaF9qs', 43.60656218226759, 3.897884664180845, false, false),
('Jardin des Plantes de Montpellier', 'Montpellier', '34000', 'Hérault', 'Occitanie','ChIJmwSMR6evthIReIYsyxaF9qs', 43.614916733296106, 3.8717026293668932, false, false);

INSERT INTO "user_grade" ("name", "point") VALUES
('Novice', 0),
('Nice follower', 100),
('Perfect partner', 200),
('Just addict', 500),
('Leader', 5000);

INSERT INTO "user_place" ("address", "city", "zip_code", "department", "region", "google_place_key", "lat", "lng") VALUES
('25 Rue Gabriel Marie', 'Marseille', '13010','Provence-Alpes-Côte d''Azur', 'Bouches-du-Rhône', 'ChIJUWddC1G_yRIRrCeWrpgJsig', 43.28572709923827, 5.401447882759161),
('2-38 Rue des Pervenches', 'Montpellier', '34000', 'Hérault', 'Occitanie', 'Ei8yIFJ1ZSBkZXMgUGVydmVuY2hlcywgMzQwMDAgTW9udHBlbGxpZXIsIEZyYW5jZSJQEk4KNAoyCafStBi9r7YSEUaddh24ThFxGh4LEO7B7qEBGhQKEgnvrrIOm6-2EhHQ4oxpJIgHHAwQAioUChIJp9K0GL2vthIREdCGsK2HxIY', 43.599436353996595, 3.8843637994919),
('38 Rue René Alazard', 'Bagnolet', '93170', 'Seine-Saint-Denis', 'Ile-de-France', 'ChIJX-N1XXNt5kcRZM_FklimsmQ', 48.87370931491529, 2.4195904982846748), 
('10 Place de la Comédie', 'Montpellier', '34000', 'Hérault', 'Occitanie','ChIJmwSMR6evthIReIYsyxaF9qs', 43.609406065437526, 3.879749211605195),
('Antigone', 'Montpellier', '34000', 'Hérault', 'Occitanie','ChIJmwSMR6evthIReIYsyxaF9qs', 43.60656218226759, 3.897884664180845),
('Jardin des Plantes de Montpellier', 'Montpellier', '34000', 'Hérault', 'Occitanie','ChIJmwSMR6evthIReIYsyxaF9qs', 43.614916733296106, 3.8717026293668932),
('Promenade du Peyrou', 'Montpellier', '34000', 'Hérault', 'Occitanie', 'ChIJtW9UagevthIRqBfgUffh-TQ', 43.61125, 3.8707581);

INSERT INTO "user" ("email", "pseudo", "password", "firstname", "lastname", "avatar", "reward_count", "admin", "user_grade_id", "user_place_id") VALUES
('russobenjamin45@gmail.com', 'Benj', '$2a$10$3eH4dUp9vclyed0jjqj/3OqobYntWA1X6xPhqUm/NyykEJu03RpRC', 'Benjamin', 'Russo', 'https://cliniquecmi.com/wp-content/uploads/cmi-physiotherapie-sportive-opt.jpg', 10, false, 1, 1),
('clotildefauchille@gmail.com', 'Clo', '$2a$10$3eH4dUp9vclyed0jjqj/3OqobYntWA1X6xPhqUm/NyykEJu03RpRC', 'Clotilde', 'Fauchille', 'https://cliniquecmi.com/wp-content/uploads/cmi-physiotherapie-sportive-opt.jpg', 20, true, 4, 2),
('mairey.jeremy@hotmail.fr', 'Jerem', '$2a$10$3eH4dUp9vclyed0jjqj/3OqobYntWA1X6xPhqUm/NyykEJu03RpRC', 'Jeremy', 'Mairey', '', 200, true, 2, 3),
('couderc.boris@gmail.com', 'bo', '$2a$10$3eH4dUp9vclyed0jjqj/3OqobYntWA1X6xPhqUm/NyykEJu03RpRC', 'Boris', 'Couderc', '', 0, false, 3, 3);

INSERT INTO "activity_statut" ("name")
VALUES ('passed'), ('canceled'), ('ongoing');

INSERT INTO "activity" ("title", "description", "illustration", "date", "time", "duration", "participant_count", "min_participant", "creator_id", "activity_place_id", "activity_status_id", "sport_id")
VALUES 

('escalade en salle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.', '', '09/11/2021', '18:30', '2:00', 1, 3, 2, 3, 3, 7),
('vélo à Vincennes', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.', '', '07/05/2021', '14:30', '1:00', 1, 2, 2, 2, 3, 5),
('basketball', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.', '', '05/11/2021', '11:30', '1:00', 3, 3, 2, 3, 3, 8),
('footing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.', '', '09/11/2021', '07:30', '4:00', 1, 2, 2, 3, 3, 6),
('Tennis à 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.', '', '07/05/2021', '14:30', '1:00', 1, 2, 2, 3, 1, 2),
('yoga', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.', '', '03/08/2021', '16:30', '1:00', 2, 4, 3, 2, 3, 4),
('randonnee en montagne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.', '', '12/08/2021', '10:00', '4:30', 2, 2, 3, 3, 3, 3), 
('foot énervé', 'partie de foot au stade des Guillants, mettez votre plus beau maillot', '', '01/05/2021', '18:00', '2:30', 2, 8, 3, 1, 1, 1), 
('Double tennis 2', 'on est chaud du revers', '', '07/05/2021', '14:30', '1:00', 1, 4, 2, 2, 1, 2),
('foot', 'partie de foot au stade Maurice, mettez votre plus beau maillot', '', '12/05/2021', '18:00', '2:30', 2, 8, 3, 1, 3, 1), 
('tennis', 'tennis en terre battue', '', '10/05/2021', '18:30', '1:00', 3, 4, 2, 2, 3, 2),
('foot', 'foot au stade', '', '01/05/2021', '18:00', '2:30', 2, 8, 3, 3, 3, 1), 
('tennis', 'ca va smasher', '', '07/05/2021', '9:30', '1:00', 1, 2, 2, 3, 3, 2),
('foot', 'foot afterwork', '', '09/12/2021', '19:00', '2:30', 2, 8, 3, 1, 3, 1), 
('vélo', 'sortie en velo tout terrain', '', '07/05/2021', '14:30', '1:00', 1, 2, 2, 5, 3, 5),
('randonnee', 'rando près du lac de Patty', '', '12/08/2021', '10:00', '4:30', 2, 2, 3, 1, 3, 3), 
('yoga', 'initiation au yoga', '', '03/11/2021', '14:30', '1:00', 1, 4, 2, 2, 3, 4),
('footing', 'footing au cannal saint-Martin', '', '04/11/2021', '17:30', '1:00', 1, 2, 2, 2, 3, 6),
('escalade', 'escalade de Bloc en forêt ', '', '04/11/2021', '11:30', '1:00', 1, 3, 2, 2, 3, 7),
('basketball', 'basketball improvisé ', '', '05/11/2021', '11:30', '1:00', 1, 3, 2, 2, 3, 8),
('fitness', 'fitness en salle ', '', '04/11/2021', '7:30', '1:00', 1, 3, 2, 2, 3, 9),
('fitness en salle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.', '', '05/11/2021', '9:30', '00:30', 2, 2, 2, 3, 3, 9);


INSERT INTO "message" ("comment", "user_id", "activity_id")
VALUES ('super cette partie, mais j''aurai pas dû manger un kebab juste avt', 1, 1),
('attend de voir mon smash', 2, 2),
('Vous voulez vous retrouver vers quelle heure ?', 2, 2);

INSERT INTO "user_has_sport" ("user_id", "sport_id")
VALUES (1, 3), (1, 4), (2, 1), (3, 2);

INSERT INTO "user_has_activity" ("user_id", "activity_id") VALUES
(1, 1), (1, 2), (2, 2), (3, 2);

COMMIT;