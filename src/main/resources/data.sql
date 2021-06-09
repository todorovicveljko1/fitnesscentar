INSERT INTO `fitness_centar` (`adresa`, `email`, `naziv`, `telefon`) VALUES
('Dositeja 6', 'ftn@fitnesscentar.comm', 'FTN', '0651212123');

INSERT INTO `korisnik` (`aktivan`, `datum_rodjenja`, `email`, `ime`, `korisnicko_ime`, `lozinka`, `prezime`, `telefon`, `uloga`, `fitness_centar_id`) VALUES
('1', NULL, 'admin@fitnesscentar.com', 'Admin', 'admin', '$2a$10$MF7hYnWLeLT66gNccBgxaONZHbrSMjlUofkp50sSpBw2PJjUqU.zS', 'admin', NULL, 'ADMIN',NULL),
('1', NULL, 'petar@fitnesscentar.com', 'Petar', 'pera', '$2a$10$MF7hYnWLeLT66gNccBgxaONZHbrSMjlUofkp50sSpBw2PJjUqU.zS', 'Perić', NULL, 'TRENER', 1),
('1', NULL, 'todorovicveljko1@gmail.com', 'Veljko', 'veljo', '$2a$10$MF7hYnWLeLT66gNccBgxaONZHbrSMjlUofkp50sSpBw2PJjUqU.zS', 'Todorović', NULL, 'CLAN', NULL),
('1', NULL, 'aleksa@gmail.com', 'Aleksa', 'aleksa', '$2a$10$MF7hYnWLeLT66gNccBgxaONZHbrSMjlUofkp50sSpBw2PJjUqU.zS', 'Aleksić', NULL, 'CLAN', NULL),
('1', NULL, 'mika@gmail.com', 'Mika', 'mika', '$2a$10$MF7hYnWLeLT66gNccBgxaONZHbrSMjlUofkp50sSpBw2PJjUqU.zS', 'Mikić', NULL, 'CLAN', NULL),
('1', NULL, 'milivoye1@gmail.com', 'Milivoje', 'miljko', '$2a$10$MF7hYnWLeLT66gNccBgxaONZHbrSMjlUofkp50sSpBw2PJjUqU.zS', 'Milovojvić', NULL, 'CLAN', NULL);

INSERT INTO `sala` (`kapacitet`, `oznaka`, `fitness_centar_id`) VALUES
('20', 'A1', '1'),
('25', 'A2', '1');

INSERT INTO `trening` (`naziv`, `opis`, `tip_treninga`, `trajanje`, `trener_id`) VALUES
('Beginning Cross Fit', 'Opis grupnog cross fit treninga ', 'Grupni', '60', '2'),
('Individualni', 'Opis treninga ', 'Individualni', '90', '2'),
('Jos neki trening', 'Opis jos nekog treninga treninga ', 'Individualni', '60', '2');

INSERT INTO `termin` (`cena`, `vreme_pocetak`, `sala_id`, `trening_id`, `broj_prijavljenih`) VALUES
('150', '2021-05-10 12:00:00.000000', '1', '1', '0'),
('200', '2021-05-19 12:00:00.000000', '1', '1', '0'),
('250', '2021-05-16 12:00:00.000000', '2', '2', '0'),
('150', '2021-05-16 14:00:00.000000', '2', '3', '0');

INSERT INTO `korisnik_termin` (`ocena`, `clan_id`, `termin_id`) VALUES
('4', '2', '1'),
('5', '6', '1'),
(NULL, '3', '2'),
(NULL, '5', '3'),
(NULL, '3', '1'),
(NULL, '2', '4'),
(NULL, '3', '4'),
(NULL, '6', '4');