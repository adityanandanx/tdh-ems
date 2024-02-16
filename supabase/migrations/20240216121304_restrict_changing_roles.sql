drop trigger if exists "columns_updateable" on "public"."users";

drop policy "CRUD for each user without role" on "public"."users";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.users_columns_updateable()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    -- Allow changing "roles" only if the user is "supabase_admin"
    IF NEW.role <> OLD.role AND current_user <> 'postgres' THEN
        RAISE EXCEPTION 'Changing "roles" is only allowed for "supabase_admin"';
    END IF;

    RETURN NEW;
END;$function$
;

create policy "CRUD for each user without role"
on "public"."users"
as permissive
for all
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));


CREATE TRIGGER check_for_restricted_updates BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION users_columns_updateable();

CREATE TRIGGER columns_updateable BEFORE INSERT OR UPDATE ON public.users FOR EACH STATEMENT EXECUTE FUNCTION users_columns_updateable();
ALTER TABLE "public"."users" DISABLE TRIGGER "columns_updateable";


