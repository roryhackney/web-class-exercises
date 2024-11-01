BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "users" VALUES (1,'Alice','alice@newdomain.com');
INSERT INTO "users" VALUES (3,'Alice','alice@example.com');
INSERT INTO "users" VALUES (4,'Bob','bob@example.com');
COMMIT;
