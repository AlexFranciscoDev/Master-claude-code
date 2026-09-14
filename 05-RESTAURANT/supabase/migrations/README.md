# Migrations

These migrations were applied to the Supabase project "SmashBros" (`vyluvmmgbjmifplnxwln`) via the Supabase MCP tools, in this order:

1. `create_user_role_enum_and_profiles`
2. `create_restaurant_tables`
3. `create_menu_sections`
4. `create_handle_new_user_trigger`
5. `seed_restaurant_tables`
6. `create_dishes`
7. `create_reservation_status_enum_and_reservations`
8. `enable_btree_gist_and_overlap_exclusion_constraint`
9. `create_is_admin_function`
10. `enable_rls_and_policies`
11. `create_updated_at_triggers`
12. `harden_functions_and_extension_schema` (fixes flagged by `get_advisors`)
13. `optimize_rls_policies` (wraps `auth.uid()`/`is_admin()` calls per Supabase performance advisor)
14. `seed_menu_content`

Run `mcp__supabase__list_migrations` against the project to see the authoritative, timestamped history.
