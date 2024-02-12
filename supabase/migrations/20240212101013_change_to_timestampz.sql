alter table "public"."events" alter column "event_end" set data type timestamp with time zone using "event_end"::timestamp with time zone;

alter table "public"."events" alter column "event_start" set data type timestamp with time zone using "event_start"::timestamp with time zone;

alter table "public"."events" alter column "registration_end" set data type timestamp with time zone using "registration_end"::timestamp with time zone;

alter table "public"."events" alter column "registration_start" set data type timestamp with time zone using "registration_start"::timestamp with time zone;


