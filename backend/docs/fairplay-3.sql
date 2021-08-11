BEGIN;

INSERT INTO "activity" ("title", "description", "illustration", "date", "time", "duration", "participant_count", "min_participant", "creator_id", "activity_place_id", "activity_status_id", "sport_id")
VALUES 
('Last B 1', 'partie de foot au stade des Guillants, mettez votre plus beau maillot', '', '01/05/2021', '18:00', '2:30', 2, 8, 3, 1, 1, 1), 
('Last B 2', 'on est chaud du revers', '', '07/05/2021', '14:30', '1:00', 1, 4, 2, 2, 2, 2),
('Last B 3', 'on est chaud du revers', '', '06/05/2021', '14:30', '1:00', 1, 4, 2, 3, 3, 2),
('Last B 4', 'on est chaud du revers', '', '07/05/2021', '14:30', '1:00', 1, 4, 2, 2, 3, 3);

COMMIT;