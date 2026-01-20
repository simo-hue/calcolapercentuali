
import { supabase } from '@/integrations/supabase/client';
import { Scaglione } from '@/types/patrimonio';

export const scaglioniService = {
    // Fetch scaglioni from DB
    getScaglioni: async (): Promise<Scaglione[]> => {
        const { data, error } = await supabase
            .from('scaglioni')
            .select('*')
            .order('soglia', { ascending: true });

        if (error) {
            console.error('Error fetching scaglioni:', error);
            throw error;
        }

        // Map DB fields to application type if necessary (handling snake_case / camelCase)
        // Assuming DB has same structure, but let's be safe with manual mapping or ensure types align
        // The DB styles likely use snake_case for columns like soglia_fine vs sogliaFine.
        // Let's verify DB schema from documentation or inference. 
        // Plan: map `soglia_fine` -> `sogliaFine`.

        return data.map((item: any) => ({
            id: item.id,
            soglia: Number(item.soglia),
            // Handle the case where DB might return null for infinity, or specific conventions
            sogliaFine: item.soglia_fine === null ? Infinity : Number(item.soglia_fine),
            percentuale: Number(item.percentuale),
            descrizione: item.descrizione
        })) as Scaglione[];
    },

    // Update all scaglioni (Replace strategy)
    // Since we are managing the entire list, standard approach is often:
    // 1. Delete all (or upsert). 
    // Given standard RLS and ID handling, getting consistent IDs might be tricky if we delete.
    // Better approach for this user's simple case: Upsert based on id? 
    // User can add/remove scaglioni in the UI. 
    // Simplest "Reset" strategy: 
    // We will perform a "Sync": delete items not in the new list, upsert items in the new list.
    updateScaglioni: async (scaglioni: Scaglione[]): Promise<void> => {

        // 1. Prepare data for DB
        const upsertData = scaglioni.map(s => ({
            id: s.id, // If id matches, it updates.
            soglia: s.soglia,
            soglia_fine: s.sogliaFine === Infinity ? null : s.sogliaFine,
            percentuale: s.percentuale,
            descrizione: s.descrizione
        }));

        // 2. Perform Upsert
        const { error: upsertError } = await supabase
            .from('scaglioni')
            .upsert(upsertData);

        if (upsertError) throw upsertError;

        // 3. Delete items that are no longer in the list
        // Get all current IDs in DB
        const currentIds = scaglioni.map(s => s.id);
        const { error: deleteError } = await supabase
            .from('scaglioni')
            .delete()
            .not('id', 'in', `(${currentIds.join(',')})`);

        if (deleteError) throw deleteError;
    }
};
