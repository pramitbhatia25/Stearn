import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_URL;
const supabaseAnonKey = import.meta.env.VITE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function register(value) {
    try {
        const { data, error } = await supabase
        .from('signups')
        .insert([{ email: value }]);
    
        if (error) {
            console.error('Error inserting data:', error);
            return "Failure"
        } else {
            console.log('Data inserted:', data);
        }

        return "Success"
    } catch (error) {
        console.error('Unexpected error:', error);
        return "Failure"
    }
}

export default register;