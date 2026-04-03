
-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE expenses;
ALTER PUBLICATION supabase_realtime ADD TABLE cat_preferences;
ALTER PUBLICATION supabase_realtime ADD TABLE balances;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', ''));
  INSERT INTO public.cat_preferences (user_id, skin)
  VALUES (NEW.id, 'orange');
  INSERT INTO public.balances (user_id, month, starting_balance, current_balance)
  VALUES (NEW.id, to_char(now(), 'YYYY-MM'), 10000, 10000);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
