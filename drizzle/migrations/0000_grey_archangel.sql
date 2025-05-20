CREATE TABLE "draws" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"draw_numbers" varchar(20),
	"player_numbers" varchar(20),
	"match_count" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "draws" ADD CONSTRAINT "draws_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;