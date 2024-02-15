drop policy "CRUD for admin" on "public"."users";

drop policy "CRUD their own details except role" on "public"."users";

create policy "CRUD for admin not role"
on "public"."users"
as permissive
for all
to authenticated
using ((get_user_role(auth.uid()) = 'ADMIN'::user_role))
with check ((role = NULL::user_role));


create policy "CRUD for each user without role"
on "public"."users"
as permissive
for all
to authenticated
using ((auth.uid() = id))
with check (((auth.uid() = id) AND (role = NULL::user_role)));



