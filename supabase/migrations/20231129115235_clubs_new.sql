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


