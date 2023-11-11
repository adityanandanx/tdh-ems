create policy "CRUD for admin 1lopzu_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'event'::text) AND (get_user_role(auth.uid()) = 'ADMIN'::user_role)));


create policy "CRUD for admin 1lopzu_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'event'::text) AND (get_user_role(auth.uid()) = 'ADMIN'::user_role)));


create policy "CRUD for admin 1lopzu_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'event'::text) AND (get_user_role(auth.uid()) = 'ADMIN'::user_role)));


create policy "CRUD for admin 1lopzu_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'event'::text) AND (get_user_role(auth.uid()) = 'ADMIN'::user_role)));



