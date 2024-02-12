alter table "auth"."identities" drop constraint "identities_provider_id_provider_unique";

alter table "auth"."identities" drop constraint "identities_pkey";

drop index if exists "auth"."identities_provider_id_provider_unique";

drop index if exists "auth"."identities_pkey";

alter table "auth"."identities" drop column "provider_id";

alter table "auth"."identities" alter column "id" drop default;

alter table "auth"."identities" alter column "id" set data type text using "id"::text;

alter table "auth"."sessions" drop column "ip";

alter table "auth"."sessions" drop column "refreshed_at";

alter table "auth"."sessions" drop column "tag";

alter table "auth"."sessions" drop column "user_agent";

CREATE UNIQUE INDEX identities_pkey ON auth.identities USING btree (provider, id);

alter table "auth"."identities" add constraint "identities_pkey" PRIMARY KEY using index "identities_pkey";

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


alter table "storage"."buckets" drop column "owner_id";

alter table "storage"."objects" drop column "owner_id";

alter table "storage"."objects" alter column "id" set default uuid_generate_v4();

alter table "storage"."buckets" add constraint "buckets_owner_fkey" FOREIGN KEY (owner) REFERENCES auth.users(id) not valid;

alter table "storage"."buckets" validate constraint "buckets_owner_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION storage.extension(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    -- @todo return the last part instead of 2
    return split_part(_filename, '.', 2);
END
$function$
;

CREATE OR REPLACE FUNCTION storage.filename(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$function$
;

CREATE OR REPLACE FUNCTION storage.foldername(name text)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[1:array_length(_parts,1)-1];
END
$function$
;


