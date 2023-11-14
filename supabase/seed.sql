
CREATE trigger on_auth_user_created
  AFTER INSERT ON auth.users
  for each ROW EXECUTE PROCEDURE handle_new_user();

-- Create admin
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) values (
        '00000000-0000-0000-0000-000000000000',
        uuid_generate_v4 (),
        'authenticated',
        'authenticated',
        'admin@tdh.com',
        crypt ('password', gen_salt ('bf')),
        current_timestamp,
        current_timestamp,
        current_timestamp,
        '{"provider":"email","providers":["email"]}',
        '{}',
        current_timestamp,
        current_timestamp,
        '',
        '',
        '',
        ''
    );

UPDATE public.users
SET role = 'ADMIN'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'admin@tdh.com'
);

-- Insert placeholder data into the "events" table with each admin as the owner
-- Insert placeholder data into the "events" table with each admin as the owner
INSERT INTO public.events (title, registration_start, registration_end, event_start, event_end, venue, "desc", cover_image_url, published, owner, tags)
SELECT
  'Event ' || row_number() over () as title,
  current_timestamp + interval '1 day' * (row_number() over ()) as registration_start,
  current_timestamp + interval '10 days' * (row_number() over ()) as registration_end,
  current_timestamp + interval '15 days' * (row_number() over ()) as event_start,
  current_timestamp + interval '20 days' * (row_number() over ()) as event_end,
  'Venue ' || row_number() over () as venue,
  'Description ' || row_number() over () as "desc",
  null,
  (random() > 0.5) as published,
  u.id as owner,
  ARRAY['tag' || (row_number() over ())] as tags
FROM public.users u, generate_series(1,20) -- Adjust the number of events per admin as needed
WHERE u.role = 'ADMIN'
LIMIT 30; -- Adjust the total number of events as needed



-- test user email identities
INSERT INTO
    auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

-- seed.sql

-- create test users
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4 (),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('password', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 10)
    );

-- Insert placeholder data into the "registrations" table with user_id randomly selected
-- INSERT INTO public.registrations (user_id, event_id)
-- SELECT
--   u.id,
--   e.id
-- FROM public.users u
-- JOIN public.events e ON e.owner = u.id
-- WHERE u.role = 'PARTICIPANT'
-- LIMIT 10; -- Adjust the number of registrations as needed

-- Insert placeholder data into the "registrations" table with user_id randomly selected
INSERT INTO public.registrations (user_id, event_id)
SELECT
  u.id,
  CASE
    WHEN random() < 0.5 THEN 1
    ELSE 2
  END AS event_id
FROM public.users u
LIMIT 10;

-- Insert more real-life data into the "events" table
-- INSERT INTO public.events (title, registration_start, registration_end, event_start, event_end, venue, "desc", cover_image_url, published, owner, tags)
-- VALUES 
--   ('Hackathon 2024', '2024-03-01', '2024-03-10', '2024-03-15', '2024-03-20', 'Tech Hub', 'Annual coding competition', 'hackathon_image.jpg', true, 'e4b5b5bd-dfc2-415d-947a-3627d1016a6d', ARRAY['hackathon', 'coding']),
--   ('Food Festival', '2024-05-01', '2024-05-10', '2024-05-15', '2024-05-20', 'Downtown Square', 'Celebration of local cuisines', 'food_festival_image.jpg', true, 'e4b5b5bd-dfc2-415d-947a-3627d1016a6d', ARRAY['food', 'festival']),
--   ('Fitness Challenge', '2024-07-01', '2024-07-10', '2024-07-15', '2024-07-20', 'City Gym', 'Get fit and have fun together', 'fitness_challenge_image.jpg', false, 'e4b5b5bd-dfc2-415d-947a-3627d1016a6d', ARRAY['fitness', 'challenge']);
