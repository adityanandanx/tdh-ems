create policy "read for all 1lopzu_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'event'::text));



