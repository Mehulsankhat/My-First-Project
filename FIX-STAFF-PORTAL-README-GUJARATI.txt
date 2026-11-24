STAFF PORTAL PERMISSION FIX

1. Supabase Dashboard > SQL Editor > New query.
2. supabase/FIX-STAFF-PORTAL-PERMISSIONS.sql માંથી આખો SQL Copy કરીને Run કરો.
3. Results: registration_select=true, directory_execute=true, removal_table_exposed=false.
4. Website માં Principal/Admin ફરી Login કરીને Ctrl+Shift+R કરો.

નોંધ: ZIP માં SQL ઉમેરવાથી Live Supabase Database આપમેળે બદલાતો નથી.
SQL Editor માં Run કરવું જરૂરી છે. કોઈ Student/Marks/Result Data Delete થતો નથી.
Teacher Approval અને Directory માત્ર Admin/Principal માટે જ છે.
