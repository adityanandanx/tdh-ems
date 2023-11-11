insert into storage.buckets (
    id, name, owner, public, avif_autodetection, file_size_limit, allowed_mime_types
) values (
    'avatar', 'avatar', null, true, false, 5242880, ARRAY['image/jpeg','image/jpg','image/png','image/gif']
);

insert into storage.buckets (
    id, name, owner, public, avif_autodetection, file_size_limit, allowed_mime_types
) values (
    'event', 'event', null, true, false, 5242880, ARRAY['image/jpeg','image/jpg','image/png','image/gif']
);

create policy "Give users access to own folder 1bs1gex_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'avatar'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1bs1gex_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'avatar'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1bs1gex_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'avatar'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1bs1gex_3"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'avatar'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



