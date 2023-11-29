drop policy "CRUD their own details except role" on "public"."users";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.users_columns_updateable()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  IF NEW.role <> OLD.role THEN
    RAISE EXCEPTION 'changing "roles" is not allowed';
  END IF;

  RETURN NEW;
END;$function$
;

create policy "CRUD their own details except role"
on "public"."users"
as permissive
for all
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));


CREATE TRIGGER columns_updateable BEFORE INSERT OR UPDATE ON public.users FOR EACH STATEMENT EXECUTE FUNCTION users_columns_updateable();


