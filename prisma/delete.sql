-- delete_user.sql

CREATE OR REPLACE FUNCTION delete_user_by_email(user_email TEXT) RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM "User" WHERE email = user_email) THEN
        DELETE FROM "User" WHERE email = user_email;
        RAISE NOTICE 'User with email "%" has been deleted.', user_email;
    ELSE
        RAISE NOTICE 'No user found with email "%".', user_email;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Call the function with the desired email
SELECT delete_user_by_email('admin@example.com');
