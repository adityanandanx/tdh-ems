create policy "Enable read access for all users"
on "public"."clubs"
as permissive
for select
to public
using (true);



