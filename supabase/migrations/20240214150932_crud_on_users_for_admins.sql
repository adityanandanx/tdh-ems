create policy "CRUD for admin"
on "public"."users"
as permissive
for all
to authenticated
using ((get_user_role(auth.uid()) = 'ADMIN'::user_role));



