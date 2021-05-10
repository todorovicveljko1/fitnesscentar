INSERT INTO `fitness_centar` (`adresa`, `email`, `naziv`, `telefon`) VALUES
('Dositeja 6', 'ftn@fitnesscentar.comm', 'FTN', '0651212123');

INSERT INTO `korisnik` (`aktivan`, `datum_rodjenja`, `email`, `ime`, `korisnicko_ime`, `lozinka`, `prezime`, `telefon`, `uloga`) VALUES
(b'1', '2021-05-10', 'admin@fitnesscentar.com', 'Admin', 'admin', 'secret', NULL, NULL, 0x00),
(b'1', '2021-05-10', 'petar@fitnesscentar.com', 'Petar', 'pera', 'secret', 'Perić', NULL, 0x01),
(b'1', '2021-05-10', 'todorovicveljko1@gmail.com', 'Veljko', 'veljo', 'secret', 'Todorović', NULL, 0x02),
(b'1', '2021-05-10', 'aleksa@gmail.com', 'Aleksa', 'aleksa', 'secret', 'Aleksić', NULL, 0x02),
(b'1', '2021-05-10', 'mika@gmail.com', 'Mika', 'mika', 'secret', 'Mikić', NULL, 0x02);

INSERT INTO `korisnik_trening` (`ocena`, `clan_id`, `trening_id`) VALUES
(5, 3, 1),
(NULL, 4, 2),
(NULL, 5, 2);

INSERT INTO `sala` (`kapacitet`, `oznaka`, `fitness_centar_id`) VALUES
(25, 'A1', 1),
(20, 'A2', 1);

INSERT INTO `sala_trening` (`sala_id`, `trening_id`) VALUES
(1, 1),
(2, 2);

INSERT INTO `trening` (`cena`, `naziv`, `opis`, `tip_treninga`, `trajanje`, `vreme_pocetak`, `trener_id`) VALUES
(100, 'Uvodni trening', 'Neki opis o uvodnom treningu', 'Grupni', 60, '2021-05-10 12:00:00.000000', 2),
(200, 'Napredni trening ', 'Neki opis o treningu', 'Grupni', 90, '2021-05-25 18:00:00.000000', 2);