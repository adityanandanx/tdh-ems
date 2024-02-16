drop policy "CRUD for each user without role" on "public"."users";

create policy "CRUD for each user without role"
on "public"."users"
as permissive
for all
to authenticated
using ((auth.uid() = id))
with check (((auth.uid() = id) AND (role = NULL::user_role) AND (email = NULL::text)));



