import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_process_step_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_process_step_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('superAdmin', 'client');
  CREATE TYPE "public"."enum_navigation_desktop_left_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_navigation_desktop_right_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_navigation_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__navigation_v_version_desktop_left_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum__navigation_v_version_desktop_right_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum__navigation_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_details_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_details_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_meat_cutting_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__meat_cutting_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_internal_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_community_tagline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_meat_cutting" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image1_id" integer,
  	"image2_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"text" jsonb,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_intro_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"number" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_home_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"community_heading" varchar,
  	"about_heading_line1" varchar,
  	"about_heading_line2" varchar,
  	"lead_text" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_meat_cuts_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_home_meat_cuts_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_home_meat_cuts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"intro" jsonb,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left" jsonb,
  	"right" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_core_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"role" varchar,
  	"name" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"button_url" varchar
  );
  
  CREATE TABLE "pages_blocks_about_core" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_farm_slaughter_promo_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"number" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_farm_slaughter_promo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_awards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_category_intro_list_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_category_intro_list_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_category_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"text" jsonb,
  	"closing_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pack_cards_cards_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_pack_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"price_note" varchar,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_pack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"notice" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sub_products_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"text" jsonb,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_sub_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"back_button_label" varchar,
  	"back_button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_charcuterie_offerings_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"subtitle" varchar,
  	"items" varchar,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_charcuterie_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_detail_page_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_detail_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" jsonb,
  	"back_button_label" varchar,
  	"back_button_url" varchar,
  	"inquiry_button_label" varchar,
  	"inquiry_button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_most_viewed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"subtitle" varchar,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_most_viewed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cutting_intro_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_cutting_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cutting_prices_cards_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_cutting_prices_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"price_note" varchar,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_cutting_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"back_button_label" varchar,
  	"back_button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_grid_cards_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"price_note" varchar,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"text" jsonb,
  	"image_id" integer,
  	"image_side" "enum_pages_blocks_process_step_image_side" DEFAULT 'left',
  	"call_button_label" varchar,
  	"call_button_url" varchar,
  	"inquiry_button_label" varchar,
  	"inquiry_button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"text" varchar,
  	"call_button_label" varchar,
  	"call_button_url" varchar,
  	"success_message" varchar,
  	"error_message" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"latitude" numeric,
  	"longitude" numeric,
  	"zoom" numeric DEFAULT 12,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_weekly_specials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"dollars" varchar,
  	"cents" varchar,
  	"unit" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_weekly_specials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"notice" varchar,
  	"call_button_label" varchar,
  	"call_button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_specials_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"path" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_internal_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_community_tagline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_meat_cutting" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image1_id" integer,
  	"image2_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"text" jsonb,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_intro_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"number" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"community_heading" varchar,
  	"about_heading_line1" varchar,
  	"about_heading_line2" varchar,
  	"lead_text" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_meat_cuts_tabs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_meat_cuts_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_meat_cuts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"intro" jsonb,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left" jsonb,
  	"right" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_core_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"role" varchar,
  	"name" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_core" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_farm_slaughter_promo_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"number" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_farm_slaughter_promo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_awards_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_awards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_intro_list_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_intro_list_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"text" jsonb,
  	"closing_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pack_cards_cards_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pack_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"price_note" varchar,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pack_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"notice" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sub_products_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"text" jsonb,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sub_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"back_button_label" varchar,
  	"back_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_charcuterie_offerings_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"subtitle" varchar,
  	"items" varchar,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_charcuterie_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_detail_page_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_detail_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" jsonb,
  	"back_button_label" varchar,
  	"back_button_url" varchar,
  	"inquiry_button_label" varchar,
  	"inquiry_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_most_viewed_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"subtitle" varchar,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_most_viewed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cutting_intro_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cutting_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cutting_prices_cards_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cutting_prices_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"price_note" varchar,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cutting_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"back_button_label" varchar,
  	"back_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_grid_cards_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"price_note" varchar,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"text" jsonb,
  	"image_id" integer,
  	"image_side" "enum__pages_v_blocks_process_step_image_side" DEFAULT 'left',
  	"call_button_label" varchar,
  	"call_button_url" varchar,
  	"inquiry_button_label" varchar,
  	"inquiry_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"text" varchar,
  	"call_button_label" varchar,
  	"call_button_url" varchar,
  	"success_message" varchar,
  	"error_message" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"latitude" numeric,
  	"longitude" numeric,
  	"zoom" numeric DEFAULT 12,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_weekly_specials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"dollars" varchar,
  	"cents" varchar,
  	"unit" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_weekly_specials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_subtitle" varchar,
  	"heading_title" varchar,
  	"heading_background_text" varchar,
  	"notice" varchar,
  	"call_button_label" varchar,
  	"call_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_specials_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_path" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_w500_url" varchar,
  	"sizes_w500_width" numeric,
  	"sizes_w500_height" numeric,
  	"sizes_w500_mime_type" varchar,
  	"sizes_w500_filesize" numeric,
  	"sizes_w500_filename" varchar,
  	"sizes_w800_url" varchar,
  	"sizes_w800_width" numeric,
  	"sizes_w800_height" numeric,
  	"sizes_w800_mime_type" varchar,
  	"sizes_w800_filesize" numeric,
  	"sizes_w800_filename" varchar,
  	"sizes_w1080_url" varchar,
  	"sizes_w1080_width" numeric,
  	"sizes_w1080_height" numeric,
  	"sizes_w1080_mime_type" varchar,
  	"sizes_w1080_filesize" numeric,
  	"sizes_w1080_filename" varchar,
  	"sizes_w1600_url" varchar,
  	"sizes_w1600_width" numeric,
  	"sizes_w1600_height" numeric,
  	"sizes_w1600_mime_type" varchar,
  	"sizes_w1600_filesize" numeric,
  	"sizes_w1600_filename" varchar
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'client' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"form_submissions_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_desktop_left_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_desktop_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_navigation_desktop_left_type" DEFAULT 'link',
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_desktop_right_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_desktop_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_navigation_desktop_right_type" DEFAULT 'link',
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_mobile_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"_status" "enum_navigation_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_navigation_v_version_desktop_left_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_desktop_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__navigation_v_version_desktop_left_type" DEFAULT 'link',
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_desktop_right_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_desktop_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__navigation_v_version_desktop_right_type" DEFAULT 'link',
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_mobile_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer,
  	"version__status" "enum__navigation_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"home_heading" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"contact_heading" varchar DEFAULT 'Contact Us',
  	"copyright" varchar,
  	"credit_label" varchar,
  	"credit_url" varchar,
  	"_status" "enum_footer_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_footer_v_version_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"home_heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer,
  	"version_contact_heading" varchar DEFAULT 'Contact Us',
  	"version_copyright" varchar,
  	"version_credit_label" varchar,
  	"version_credit_url" varchar,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "contact_details" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar,
  	"phone" varchar,
  	"phone_link" varchar,
  	"email" varchar,
  	"hours_times" varchar,
  	"hours_days" varchar,
  	"facebook_url" varchar,
  	"instagram_url" varchar,
  	"_status" "enum_contact_details_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_details_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_address" varchar,
  	"version_phone" varchar,
  	"version_phone_link" varchar,
  	"version_email" varchar,
  	"version_hours_times" varchar,
  	"version_hours_days" varchar,
  	"version_facebook_url" varchar,
  	"version_instagram_url" varchar,
  	"version__status" "enum__contact_details_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "meat_cutting_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "meat_cutting" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature_image_id" integer,
  	"feature_number" varchar,
  	"feature_label" varchar,
  	"subtitle" varchar,
  	"title" varchar,
  	"background_text" varchar,
  	"text" varchar,
  	"call_button_label" varchar,
  	"call_button_url" varchar,
  	"inquiry_button_label" varchar,
  	"inquiry_button_url" varchar,
  	"_status" "enum_meat_cutting_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_meat_cutting_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_meat_cutting_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_feature_image_id" integer,
  	"version_feature_number" varchar,
  	"version_feature_label" varchar,
  	"version_subtitle" varchar,
  	"version_title" varchar,
  	"version_background_text" varchar,
  	"version_text" varchar,
  	"version_call_button_label" varchar,
  	"version_call_button_url" varchar,
  	"version_inquiry_button_label" varchar,
  	"version_inquiry_button_url" varchar,
  	"version__status" "enum__meat_cutting_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "pages_blocks_internal_header" ADD CONSTRAINT "pages_blocks_internal_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_heading" ADD CONSTRAINT "pages_blocks_section_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_community_tagline" ADD CONSTRAINT "pages_blocks_community_tagline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_meat_cutting" ADD CONSTRAINT "pages_blocks_meat_cutting_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_intro_stats" ADD CONSTRAINT "pages_blocks_home_intro_stats_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_intro_stats" ADD CONSTRAINT "pages_blocks_home_intro_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_intro" ADD CONSTRAINT "pages_blocks_home_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_meat_cuts_tabs_items" ADD CONSTRAINT "pages_blocks_home_meat_cuts_tabs_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_meat_cuts_tabs_items" ADD CONSTRAINT "pages_blocks_home_meat_cuts_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_meat_cuts_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_meat_cuts_tabs" ADD CONSTRAINT "pages_blocks_home_meat_cuts_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_meat_cuts_tabs" ADD CONSTRAINT "pages_blocks_home_meat_cuts_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_meat_cuts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_meat_cuts" ADD CONSTRAINT "pages_blocks_home_meat_cuts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_intro" ADD CONSTRAINT "pages_blocks_about_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_text" ADD CONSTRAINT "pages_blocks_about_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_core_people" ADD CONSTRAINT "pages_blocks_about_core_people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_core_people" ADD CONSTRAINT "pages_blocks_about_core_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_core"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_core" ADD CONSTRAINT "pages_blocks_about_core_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_farm_slaughter_promo_items" ADD CONSTRAINT "pages_blocks_farm_slaughter_promo_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_farm_slaughter_promo_items" ADD CONSTRAINT "pages_blocks_farm_slaughter_promo_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_farm_slaughter_promo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_farm_slaughter_promo" ADD CONSTRAINT "pages_blocks_farm_slaughter_promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards_logos" ADD CONSTRAINT "pages_blocks_awards_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards_logos" ADD CONSTRAINT "pages_blocks_awards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards" ADD CONSTRAINT "pages_blocks_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_intro_list_columns_items" ADD CONSTRAINT "pages_blocks_category_intro_list_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_category_intro_list_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_intro_list_columns" ADD CONSTRAINT "pages_blocks_category_intro_list_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_category_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_intro" ADD CONSTRAINT "pages_blocks_category_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pack_cards_cards_rows" ADD CONSTRAINT "pages_blocks_pack_cards_cards_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pack_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pack_cards_cards" ADD CONSTRAINT "pages_blocks_pack_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pack_cards_cards" ADD CONSTRAINT "pages_blocks_pack_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pack_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pack_cards" ADD CONSTRAINT "pages_blocks_pack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sub_products_items" ADD CONSTRAINT "pages_blocks_sub_products_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_sub_products_items" ADD CONSTRAINT "pages_blocks_sub_products_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sub_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sub_products" ADD CONSTRAINT "pages_blocks_sub_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_charcuterie_offerings_cards" ADD CONSTRAINT "pages_blocks_charcuterie_offerings_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_charcuterie_offerings_cards" ADD CONSTRAINT "pages_blocks_charcuterie_offerings_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_charcuterie_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_charcuterie_offerings" ADD CONSTRAINT "pages_blocks_charcuterie_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_detail_page_slides" ADD CONSTRAINT "pages_blocks_detail_page_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_detail_page_slides" ADD CONSTRAINT "pages_blocks_detail_page_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_detail_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_detail_page" ADD CONSTRAINT "pages_blocks_detail_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_most_viewed_cards" ADD CONSTRAINT "pages_blocks_most_viewed_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_most_viewed_cards" ADD CONSTRAINT "pages_blocks_most_viewed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_most_viewed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_most_viewed" ADD CONSTRAINT "pages_blocks_most_viewed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cutting_intro_cards" ADD CONSTRAINT "pages_blocks_cutting_intro_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cutting_intro_cards" ADD CONSTRAINT "pages_blocks_cutting_intro_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cutting_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cutting_intro" ADD CONSTRAINT "pages_blocks_cutting_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cutting_prices_cards_rows" ADD CONSTRAINT "pages_blocks_cutting_prices_cards_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cutting_prices_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cutting_prices_cards" ADD CONSTRAINT "pages_blocks_cutting_prices_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cutting_prices_cards" ADD CONSTRAINT "pages_blocks_cutting_prices_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cutting_prices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cutting_prices" ADD CONSTRAINT "pages_blocks_cutting_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid_cards_rows" ADD CONSTRAINT "pages_blocks_pricing_grid_cards_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid_cards" ADD CONSTRAINT "pages_blocks_pricing_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid_cards" ADD CONSTRAINT "pages_blocks_pricing_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_grid" ADD CONSTRAINT "pages_blocks_pricing_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_step" ADD CONSTRAINT "pages_blocks_process_step_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_step" ADD CONSTRAINT "pages_blocks_process_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_intro" ADD CONSTRAINT "pages_blocks_contact_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details" ADD CONSTRAINT "pages_blocks_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_map" ADD CONSTRAINT "pages_blocks_contact_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_weekly_specials_items" ADD CONSTRAINT "pages_blocks_weekly_specials_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_weekly_specials_items" ADD CONSTRAINT "pages_blocks_weekly_specials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_weekly_specials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_weekly_specials" ADD CONSTRAINT "pages_blocks_weekly_specials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_specials_text" ADD CONSTRAINT "pages_blocks_specials_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_internal_header" ADD CONSTRAINT "_pages_v_blocks_internal_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_heading" ADD CONSTRAINT "_pages_v_blocks_section_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_community_tagline" ADD CONSTRAINT "_pages_v_blocks_community_tagline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_meat_cutting" ADD CONSTRAINT "_pages_v_blocks_meat_cutting_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_intro_stats" ADD CONSTRAINT "_pages_v_blocks_home_intro_stats_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_intro_stats" ADD CONSTRAINT "_pages_v_blocks_home_intro_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_intro" ADD CONSTRAINT "_pages_v_blocks_home_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_meat_cuts_tabs_items" ADD CONSTRAINT "_pages_v_blocks_home_meat_cuts_tabs_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_meat_cuts_tabs_items" ADD CONSTRAINT "_pages_v_blocks_home_meat_cuts_tabs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_meat_cuts_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_meat_cuts_tabs" ADD CONSTRAINT "_pages_v_blocks_home_meat_cuts_tabs_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_meat_cuts_tabs" ADD CONSTRAINT "_pages_v_blocks_home_meat_cuts_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_meat_cuts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_meat_cuts" ADD CONSTRAINT "_pages_v_blocks_home_meat_cuts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_intro" ADD CONSTRAINT "_pages_v_blocks_about_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_text" ADD CONSTRAINT "_pages_v_blocks_about_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_core_people" ADD CONSTRAINT "_pages_v_blocks_about_core_people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_core_people" ADD CONSTRAINT "_pages_v_blocks_about_core_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_core"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_core" ADD CONSTRAINT "_pages_v_blocks_about_core_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_farm_slaughter_promo_items" ADD CONSTRAINT "_pages_v_blocks_farm_slaughter_promo_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_farm_slaughter_promo_items" ADD CONSTRAINT "_pages_v_blocks_farm_slaughter_promo_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_farm_slaughter_promo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_farm_slaughter_promo" ADD CONSTRAINT "_pages_v_blocks_farm_slaughter_promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards_logos" ADD CONSTRAINT "_pages_v_blocks_awards_logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards_logos" ADD CONSTRAINT "_pages_v_blocks_awards_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards" ADD CONSTRAINT "_pages_v_blocks_awards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_intro_list_columns_items" ADD CONSTRAINT "_pages_v_blocks_category_intro_list_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_category_intro_list_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_intro_list_columns" ADD CONSTRAINT "_pages_v_blocks_category_intro_list_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_category_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_intro" ADD CONSTRAINT "_pages_v_blocks_category_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pack_cards_cards_rows" ADD CONSTRAINT "_pages_v_blocks_pack_cards_cards_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pack_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pack_cards_cards" ADD CONSTRAINT "_pages_v_blocks_pack_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pack_cards_cards" ADD CONSTRAINT "_pages_v_blocks_pack_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pack_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pack_cards" ADD CONSTRAINT "_pages_v_blocks_pack_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sub_products_items" ADD CONSTRAINT "_pages_v_blocks_sub_products_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sub_products_items" ADD CONSTRAINT "_pages_v_blocks_sub_products_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sub_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sub_products" ADD CONSTRAINT "_pages_v_blocks_sub_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_charcuterie_offerings_cards" ADD CONSTRAINT "_pages_v_blocks_charcuterie_offerings_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_charcuterie_offerings_cards" ADD CONSTRAINT "_pages_v_blocks_charcuterie_offerings_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_charcuterie_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_charcuterie_offerings" ADD CONSTRAINT "_pages_v_blocks_charcuterie_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_detail_page_slides" ADD CONSTRAINT "_pages_v_blocks_detail_page_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_detail_page_slides" ADD CONSTRAINT "_pages_v_blocks_detail_page_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_detail_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_detail_page" ADD CONSTRAINT "_pages_v_blocks_detail_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_most_viewed_cards" ADD CONSTRAINT "_pages_v_blocks_most_viewed_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_most_viewed_cards" ADD CONSTRAINT "_pages_v_blocks_most_viewed_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_most_viewed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_most_viewed" ADD CONSTRAINT "_pages_v_blocks_most_viewed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cutting_intro_cards" ADD CONSTRAINT "_pages_v_blocks_cutting_intro_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cutting_intro_cards" ADD CONSTRAINT "_pages_v_blocks_cutting_intro_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cutting_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cutting_intro" ADD CONSTRAINT "_pages_v_blocks_cutting_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cutting_prices_cards_rows" ADD CONSTRAINT "_pages_v_blocks_cutting_prices_cards_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cutting_prices_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cutting_prices_cards" ADD CONSTRAINT "_pages_v_blocks_cutting_prices_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cutting_prices_cards" ADD CONSTRAINT "_pages_v_blocks_cutting_prices_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cutting_prices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cutting_prices" ADD CONSTRAINT "_pages_v_blocks_cutting_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_grid_cards_rows" ADD CONSTRAINT "_pages_v_blocks_pricing_grid_cards_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_grid_cards" ADD CONSTRAINT "_pages_v_blocks_pricing_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_grid_cards" ADD CONSTRAINT "_pages_v_blocks_pricing_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_grid" ADD CONSTRAINT "_pages_v_blocks_pricing_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_step" ADD CONSTRAINT "_pages_v_blocks_process_step_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_step" ADD CONSTRAINT "_pages_v_blocks_process_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_intro" ADD CONSTRAINT "_pages_v_blocks_contact_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_details" ADD CONSTRAINT "_pages_v_blocks_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_map" ADD CONSTRAINT "_pages_v_blocks_contact_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_weekly_specials_items" ADD CONSTRAINT "_pages_v_blocks_weekly_specials_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_weekly_specials_items" ADD CONSTRAINT "_pages_v_blocks_weekly_specials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_weekly_specials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_weekly_specials" ADD CONSTRAINT "_pages_v_blocks_weekly_specials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_specials_text" ADD CONSTRAINT "_pages_v_blocks_specials_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_desktop_left_links" ADD CONSTRAINT "navigation_desktop_left_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_desktop_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_desktop_left" ADD CONSTRAINT "navigation_desktop_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_desktop_right_links" ADD CONSTRAINT "navigation_desktop_right_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_desktop_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_desktop_right" ADD CONSTRAINT "navigation_desktop_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_mobile_links" ADD CONSTRAINT "navigation_mobile_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation" ADD CONSTRAINT "navigation_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_desktop_left_links" ADD CONSTRAINT "_navigation_v_version_desktop_left_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_version_desktop_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_desktop_left" ADD CONSTRAINT "_navigation_v_version_desktop_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_desktop_right_links" ADD CONSTRAINT "_navigation_v_version_desktop_right_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_version_desktop_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_desktop_right" ADD CONSTRAINT "_navigation_v_version_desktop_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_mobile_links" ADD CONSTRAINT "_navigation_v_version_mobile_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v" ADD CONSTRAINT "_navigation_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns_links" ADD CONSTRAINT "_footer_v_version_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_columns" ADD CONSTRAINT "_footer_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meat_cutting_stats" ADD CONSTRAINT "meat_cutting_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meat_cutting"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meat_cutting" ADD CONSTRAINT "meat_cutting_feature_image_id_media_id_fk" FOREIGN KEY ("feature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_meat_cutting_v_version_stats" ADD CONSTRAINT "_meat_cutting_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_meat_cutting_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_meat_cutting_v" ADD CONSTRAINT "_meat_cutting_v_version_feature_image_id_media_id_fk" FOREIGN KEY ("version_feature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_internal_header_order_idx" ON "pages_blocks_internal_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_internal_header_parent_id_idx" ON "pages_blocks_internal_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_internal_header_path_idx" ON "pages_blocks_internal_header" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_heading_order_idx" ON "pages_blocks_section_heading" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_heading_parent_id_idx" ON "pages_blocks_section_heading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_heading_path_idx" ON "pages_blocks_section_heading" USING btree ("_path");
  CREATE INDEX "pages_blocks_community_tagline_order_idx" ON "pages_blocks_community_tagline" USING btree ("_order");
  CREATE INDEX "pages_blocks_community_tagline_parent_id_idx" ON "pages_blocks_community_tagline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_community_tagline_path_idx" ON "pages_blocks_community_tagline" USING btree ("_path");
  CREATE INDEX "pages_blocks_meat_cutting_order_idx" ON "pages_blocks_meat_cutting" USING btree ("_order");
  CREATE INDEX "pages_blocks_meat_cutting_parent_id_idx" ON "pages_blocks_meat_cutting" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_meat_cutting_path_idx" ON "pages_blocks_meat_cutting" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_image1_idx" ON "pages_blocks_home_hero" USING btree ("image1_id");
  CREATE INDEX "pages_blocks_home_hero_image2_idx" ON "pages_blocks_home_hero" USING btree ("image2_id");
  CREATE INDEX "pages_blocks_home_intro_stats_order_idx" ON "pages_blocks_home_intro_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_intro_stats_parent_id_idx" ON "pages_blocks_home_intro_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_intro_stats_icon_idx" ON "pages_blocks_home_intro_stats" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_home_intro_order_idx" ON "pages_blocks_home_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_intro_parent_id_idx" ON "pages_blocks_home_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_intro_path_idx" ON "pages_blocks_home_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_meat_cuts_tabs_items_order_idx" ON "pages_blocks_home_meat_cuts_tabs_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_meat_cuts_tabs_items_parent_id_idx" ON "pages_blocks_home_meat_cuts_tabs_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_meat_cuts_tabs_items_image_idx" ON "pages_blocks_home_meat_cuts_tabs_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_home_meat_cuts_tabs_order_idx" ON "pages_blocks_home_meat_cuts_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_meat_cuts_tabs_parent_id_idx" ON "pages_blocks_home_meat_cuts_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_meat_cuts_tabs_icon_idx" ON "pages_blocks_home_meat_cuts_tabs" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_home_meat_cuts_order_idx" ON "pages_blocks_home_meat_cuts" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_meat_cuts_parent_id_idx" ON "pages_blocks_home_meat_cuts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_meat_cuts_path_idx" ON "pages_blocks_home_meat_cuts" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_intro_order_idx" ON "pages_blocks_about_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_intro_parent_id_idx" ON "pages_blocks_about_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_intro_path_idx" ON "pages_blocks_about_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_text_order_idx" ON "pages_blocks_about_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_text_parent_id_idx" ON "pages_blocks_about_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_text_path_idx" ON "pages_blocks_about_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_core_people_order_idx" ON "pages_blocks_about_core_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_core_people_parent_id_idx" ON "pages_blocks_about_core_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_core_people_image_idx" ON "pages_blocks_about_core_people" USING btree ("image_id");
  CREATE INDEX "pages_blocks_about_core_order_idx" ON "pages_blocks_about_core" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_core_parent_id_idx" ON "pages_blocks_about_core" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_core_path_idx" ON "pages_blocks_about_core" USING btree ("_path");
  CREATE INDEX "pages_blocks_farm_slaughter_promo_items_order_idx" ON "pages_blocks_farm_slaughter_promo_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_farm_slaughter_promo_items_parent_id_idx" ON "pages_blocks_farm_slaughter_promo_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_farm_slaughter_promo_items_image_idx" ON "pages_blocks_farm_slaughter_promo_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_farm_slaughter_promo_order_idx" ON "pages_blocks_farm_slaughter_promo" USING btree ("_order");
  CREATE INDEX "pages_blocks_farm_slaughter_promo_parent_id_idx" ON "pages_blocks_farm_slaughter_promo" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_farm_slaughter_promo_path_idx" ON "pages_blocks_farm_slaughter_promo" USING btree ("_path");
  CREATE INDEX "pages_blocks_awards_logos_order_idx" ON "pages_blocks_awards_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_awards_logos_parent_id_idx" ON "pages_blocks_awards_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_awards_logos_image_idx" ON "pages_blocks_awards_logos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_awards_order_idx" ON "pages_blocks_awards" USING btree ("_order");
  CREATE INDEX "pages_blocks_awards_parent_id_idx" ON "pages_blocks_awards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_awards_path_idx" ON "pages_blocks_awards" USING btree ("_path");
  CREATE INDEX "pages_blocks_category_intro_list_columns_items_order_idx" ON "pages_blocks_category_intro_list_columns_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_intro_list_columns_items_parent_id_idx" ON "pages_blocks_category_intro_list_columns_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_intro_list_columns_order_idx" ON "pages_blocks_category_intro_list_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_intro_list_columns_parent_id_idx" ON "pages_blocks_category_intro_list_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_intro_order_idx" ON "pages_blocks_category_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_intro_parent_id_idx" ON "pages_blocks_category_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_intro_path_idx" ON "pages_blocks_category_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_pack_cards_cards_rows_order_idx" ON "pages_blocks_pack_cards_cards_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_pack_cards_cards_rows_parent_id_idx" ON "pages_blocks_pack_cards_cards_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pack_cards_cards_order_idx" ON "pages_blocks_pack_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pack_cards_cards_parent_id_idx" ON "pages_blocks_pack_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pack_cards_cards_image_idx" ON "pages_blocks_pack_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_pack_cards_order_idx" ON "pages_blocks_pack_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pack_cards_parent_id_idx" ON "pages_blocks_pack_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pack_cards_path_idx" ON "pages_blocks_pack_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_sub_products_items_order_idx" ON "pages_blocks_sub_products_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_sub_products_items_parent_id_idx" ON "pages_blocks_sub_products_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sub_products_items_image_idx" ON "pages_blocks_sub_products_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_sub_products_order_idx" ON "pages_blocks_sub_products" USING btree ("_order");
  CREATE INDEX "pages_blocks_sub_products_parent_id_idx" ON "pages_blocks_sub_products" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sub_products_path_idx" ON "pages_blocks_sub_products" USING btree ("_path");
  CREATE INDEX "pages_blocks_charcuterie_offerings_cards_order_idx" ON "pages_blocks_charcuterie_offerings_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_charcuterie_offerings_cards_parent_id_idx" ON "pages_blocks_charcuterie_offerings_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_charcuterie_offerings_cards_image_idx" ON "pages_blocks_charcuterie_offerings_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_charcuterie_offerings_order_idx" ON "pages_blocks_charcuterie_offerings" USING btree ("_order");
  CREATE INDEX "pages_blocks_charcuterie_offerings_parent_id_idx" ON "pages_blocks_charcuterie_offerings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_charcuterie_offerings_path_idx" ON "pages_blocks_charcuterie_offerings" USING btree ("_path");
  CREATE INDEX "pages_blocks_detail_page_slides_order_idx" ON "pages_blocks_detail_page_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_detail_page_slides_parent_id_idx" ON "pages_blocks_detail_page_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_detail_page_slides_image_idx" ON "pages_blocks_detail_page_slides" USING btree ("image_id");
  CREATE INDEX "pages_blocks_detail_page_order_idx" ON "pages_blocks_detail_page" USING btree ("_order");
  CREATE INDEX "pages_blocks_detail_page_parent_id_idx" ON "pages_blocks_detail_page" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_detail_page_path_idx" ON "pages_blocks_detail_page" USING btree ("_path");
  CREATE INDEX "pages_blocks_most_viewed_cards_order_idx" ON "pages_blocks_most_viewed_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_most_viewed_cards_parent_id_idx" ON "pages_blocks_most_viewed_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_most_viewed_cards_image_idx" ON "pages_blocks_most_viewed_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_most_viewed_order_idx" ON "pages_blocks_most_viewed" USING btree ("_order");
  CREATE INDEX "pages_blocks_most_viewed_parent_id_idx" ON "pages_blocks_most_viewed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_most_viewed_path_idx" ON "pages_blocks_most_viewed" USING btree ("_path");
  CREATE INDEX "pages_blocks_cutting_intro_cards_order_idx" ON "pages_blocks_cutting_intro_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cutting_intro_cards_parent_id_idx" ON "pages_blocks_cutting_intro_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cutting_intro_cards_image_idx" ON "pages_blocks_cutting_intro_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cutting_intro_order_idx" ON "pages_blocks_cutting_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_cutting_intro_parent_id_idx" ON "pages_blocks_cutting_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cutting_intro_path_idx" ON "pages_blocks_cutting_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_cutting_prices_cards_rows_order_idx" ON "pages_blocks_cutting_prices_cards_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_cutting_prices_cards_rows_parent_id_idx" ON "pages_blocks_cutting_prices_cards_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cutting_prices_cards_order_idx" ON "pages_blocks_cutting_prices_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cutting_prices_cards_parent_id_idx" ON "pages_blocks_cutting_prices_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cutting_prices_cards_image_idx" ON "pages_blocks_cutting_prices_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cutting_prices_order_idx" ON "pages_blocks_cutting_prices" USING btree ("_order");
  CREATE INDEX "pages_blocks_cutting_prices_parent_id_idx" ON "pages_blocks_cutting_prices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cutting_prices_path_idx" ON "pages_blocks_cutting_prices" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_grid_cards_rows_order_idx" ON "pages_blocks_pricing_grid_cards_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_cards_rows_parent_id_idx" ON "pages_blocks_pricing_grid_cards_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_cards_order_idx" ON "pages_blocks_pricing_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_cards_parent_id_idx" ON "pages_blocks_pricing_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_cards_image_idx" ON "pages_blocks_pricing_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_pricing_grid_order_idx" ON "pages_blocks_pricing_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_grid_parent_id_idx" ON "pages_blocks_pricing_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_grid_path_idx" ON "pages_blocks_pricing_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_step_order_idx" ON "pages_blocks_process_step" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_step_parent_id_idx" ON "pages_blocks_process_step" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_step_path_idx" ON "pages_blocks_process_step" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_step_image_idx" ON "pages_blocks_process_step" USING btree ("image_id");
  CREATE INDEX "pages_blocks_contact_intro_order_idx" ON "pages_blocks_contact_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_intro_parent_id_idx" ON "pages_blocks_contact_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_intro_path_idx" ON "pages_blocks_contact_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_details_order_idx" ON "pages_blocks_contact_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_parent_id_idx" ON "pages_blocks_contact_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_path_idx" ON "pages_blocks_contact_details" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_map_order_idx" ON "pages_blocks_contact_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_map_parent_id_idx" ON "pages_blocks_contact_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_map_path_idx" ON "pages_blocks_contact_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_weekly_specials_items_order_idx" ON "pages_blocks_weekly_specials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_weekly_specials_items_parent_id_idx" ON "pages_blocks_weekly_specials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_weekly_specials_items_image_idx" ON "pages_blocks_weekly_specials_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_weekly_specials_order_idx" ON "pages_blocks_weekly_specials" USING btree ("_order");
  CREATE INDEX "pages_blocks_weekly_specials_parent_id_idx" ON "pages_blocks_weekly_specials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_weekly_specials_path_idx" ON "pages_blocks_weekly_specials" USING btree ("_path");
  CREATE INDEX "pages_blocks_specials_text_order_idx" ON "pages_blocks_specials_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_specials_text_parent_id_idx" ON "pages_blocks_specials_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_specials_text_path_idx" ON "pages_blocks_specials_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_internal_header_order_idx" ON "_pages_v_blocks_internal_header" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_internal_header_parent_id_idx" ON "_pages_v_blocks_internal_header" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_internal_header_path_idx" ON "_pages_v_blocks_internal_header" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_section_heading_order_idx" ON "_pages_v_blocks_section_heading" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_heading_parent_id_idx" ON "_pages_v_blocks_section_heading" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_heading_path_idx" ON "_pages_v_blocks_section_heading" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_community_tagline_order_idx" ON "_pages_v_blocks_community_tagline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_community_tagline_parent_id_idx" ON "_pages_v_blocks_community_tagline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_community_tagline_path_idx" ON "_pages_v_blocks_community_tagline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_meat_cutting_order_idx" ON "_pages_v_blocks_meat_cutting" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_meat_cutting_parent_id_idx" ON "_pages_v_blocks_meat_cutting" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_meat_cutting_path_idx" ON "_pages_v_blocks_meat_cutting" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_hero_order_idx" ON "_pages_v_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_parent_id_idx" ON "_pages_v_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_path_idx" ON "_pages_v_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_hero_image1_idx" ON "_pages_v_blocks_home_hero" USING btree ("image1_id");
  CREATE INDEX "_pages_v_blocks_home_hero_image2_idx" ON "_pages_v_blocks_home_hero" USING btree ("image2_id");
  CREATE INDEX "_pages_v_blocks_home_intro_stats_order_idx" ON "_pages_v_blocks_home_intro_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_intro_stats_parent_id_idx" ON "_pages_v_blocks_home_intro_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_intro_stats_icon_idx" ON "_pages_v_blocks_home_intro_stats" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_home_intro_order_idx" ON "_pages_v_blocks_home_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_intro_parent_id_idx" ON "_pages_v_blocks_home_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_intro_path_idx" ON "_pages_v_blocks_home_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_tabs_items_order_idx" ON "_pages_v_blocks_home_meat_cuts_tabs_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_tabs_items_parent_id_idx" ON "_pages_v_blocks_home_meat_cuts_tabs_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_tabs_items_image_idx" ON "_pages_v_blocks_home_meat_cuts_tabs_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_tabs_order_idx" ON "_pages_v_blocks_home_meat_cuts_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_tabs_parent_id_idx" ON "_pages_v_blocks_home_meat_cuts_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_tabs_icon_idx" ON "_pages_v_blocks_home_meat_cuts_tabs" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_order_idx" ON "_pages_v_blocks_home_meat_cuts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_parent_id_idx" ON "_pages_v_blocks_home_meat_cuts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_meat_cuts_path_idx" ON "_pages_v_blocks_home_meat_cuts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_intro_order_idx" ON "_pages_v_blocks_about_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_intro_parent_id_idx" ON "_pages_v_blocks_about_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_intro_path_idx" ON "_pages_v_blocks_about_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_text_order_idx" ON "_pages_v_blocks_about_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_text_parent_id_idx" ON "_pages_v_blocks_about_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_text_path_idx" ON "_pages_v_blocks_about_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_core_people_order_idx" ON "_pages_v_blocks_about_core_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_core_people_parent_id_idx" ON "_pages_v_blocks_about_core_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_core_people_image_idx" ON "_pages_v_blocks_about_core_people" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_core_order_idx" ON "_pages_v_blocks_about_core" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_core_parent_id_idx" ON "_pages_v_blocks_about_core" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_core_path_idx" ON "_pages_v_blocks_about_core" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_farm_slaughter_promo_items_order_idx" ON "_pages_v_blocks_farm_slaughter_promo_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_farm_slaughter_promo_items_parent_id_idx" ON "_pages_v_blocks_farm_slaughter_promo_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_farm_slaughter_promo_items_image_idx" ON "_pages_v_blocks_farm_slaughter_promo_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_farm_slaughter_promo_order_idx" ON "_pages_v_blocks_farm_slaughter_promo" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_farm_slaughter_promo_parent_id_idx" ON "_pages_v_blocks_farm_slaughter_promo" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_farm_slaughter_promo_path_idx" ON "_pages_v_blocks_farm_slaughter_promo" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_awards_logos_order_idx" ON "_pages_v_blocks_awards_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_awards_logos_parent_id_idx" ON "_pages_v_blocks_awards_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_awards_logos_image_idx" ON "_pages_v_blocks_awards_logos" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_awards_order_idx" ON "_pages_v_blocks_awards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_awards_parent_id_idx" ON "_pages_v_blocks_awards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_awards_path_idx" ON "_pages_v_blocks_awards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_category_intro_list_columns_items_order_idx" ON "_pages_v_blocks_category_intro_list_columns_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_intro_list_columns_items_parent_id_idx" ON "_pages_v_blocks_category_intro_list_columns_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_intro_list_columns_order_idx" ON "_pages_v_blocks_category_intro_list_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_intro_list_columns_parent_id_idx" ON "_pages_v_blocks_category_intro_list_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_intro_order_idx" ON "_pages_v_blocks_category_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_intro_parent_id_idx" ON "_pages_v_blocks_category_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_intro_path_idx" ON "_pages_v_blocks_category_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pack_cards_cards_rows_order_idx" ON "_pages_v_blocks_pack_cards_cards_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pack_cards_cards_rows_parent_id_idx" ON "_pages_v_blocks_pack_cards_cards_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pack_cards_cards_order_idx" ON "_pages_v_blocks_pack_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pack_cards_cards_parent_id_idx" ON "_pages_v_blocks_pack_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pack_cards_cards_image_idx" ON "_pages_v_blocks_pack_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_pack_cards_order_idx" ON "_pages_v_blocks_pack_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pack_cards_parent_id_idx" ON "_pages_v_blocks_pack_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pack_cards_path_idx" ON "_pages_v_blocks_pack_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_sub_products_items_order_idx" ON "_pages_v_blocks_sub_products_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sub_products_items_parent_id_idx" ON "_pages_v_blocks_sub_products_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sub_products_items_image_idx" ON "_pages_v_blocks_sub_products_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_sub_products_order_idx" ON "_pages_v_blocks_sub_products" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sub_products_parent_id_idx" ON "_pages_v_blocks_sub_products" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sub_products_path_idx" ON "_pages_v_blocks_sub_products" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_charcuterie_offerings_cards_order_idx" ON "_pages_v_blocks_charcuterie_offerings_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_charcuterie_offerings_cards_parent_id_idx" ON "_pages_v_blocks_charcuterie_offerings_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_charcuterie_offerings_cards_image_idx" ON "_pages_v_blocks_charcuterie_offerings_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_charcuterie_offerings_order_idx" ON "_pages_v_blocks_charcuterie_offerings" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_charcuterie_offerings_parent_id_idx" ON "_pages_v_blocks_charcuterie_offerings" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_charcuterie_offerings_path_idx" ON "_pages_v_blocks_charcuterie_offerings" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_detail_page_slides_order_idx" ON "_pages_v_blocks_detail_page_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_detail_page_slides_parent_id_idx" ON "_pages_v_blocks_detail_page_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_detail_page_slides_image_idx" ON "_pages_v_blocks_detail_page_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_detail_page_order_idx" ON "_pages_v_blocks_detail_page" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_detail_page_parent_id_idx" ON "_pages_v_blocks_detail_page" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_detail_page_path_idx" ON "_pages_v_blocks_detail_page" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_most_viewed_cards_order_idx" ON "_pages_v_blocks_most_viewed_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_most_viewed_cards_parent_id_idx" ON "_pages_v_blocks_most_viewed_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_most_viewed_cards_image_idx" ON "_pages_v_blocks_most_viewed_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_most_viewed_order_idx" ON "_pages_v_blocks_most_viewed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_most_viewed_parent_id_idx" ON "_pages_v_blocks_most_viewed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_most_viewed_path_idx" ON "_pages_v_blocks_most_viewed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cutting_intro_cards_order_idx" ON "_pages_v_blocks_cutting_intro_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cutting_intro_cards_parent_id_idx" ON "_pages_v_blocks_cutting_intro_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cutting_intro_cards_image_idx" ON "_pages_v_blocks_cutting_intro_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cutting_intro_order_idx" ON "_pages_v_blocks_cutting_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cutting_intro_parent_id_idx" ON "_pages_v_blocks_cutting_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cutting_intro_path_idx" ON "_pages_v_blocks_cutting_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cutting_prices_cards_rows_order_idx" ON "_pages_v_blocks_cutting_prices_cards_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cutting_prices_cards_rows_parent_id_idx" ON "_pages_v_blocks_cutting_prices_cards_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cutting_prices_cards_order_idx" ON "_pages_v_blocks_cutting_prices_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cutting_prices_cards_parent_id_idx" ON "_pages_v_blocks_cutting_prices_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cutting_prices_cards_image_idx" ON "_pages_v_blocks_cutting_prices_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cutting_prices_order_idx" ON "_pages_v_blocks_cutting_prices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cutting_prices_parent_id_idx" ON "_pages_v_blocks_cutting_prices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cutting_prices_path_idx" ON "_pages_v_blocks_cutting_prices" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_grid_cards_rows_order_idx" ON "_pages_v_blocks_pricing_grid_cards_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_grid_cards_rows_parent_id_idx" ON "_pages_v_blocks_pricing_grid_cards_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_grid_cards_order_idx" ON "_pages_v_blocks_pricing_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_grid_cards_parent_id_idx" ON "_pages_v_blocks_pricing_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_grid_cards_image_idx" ON "_pages_v_blocks_pricing_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_pricing_grid_order_idx" ON "_pages_v_blocks_pricing_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_grid_parent_id_idx" ON "_pages_v_blocks_pricing_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_grid_path_idx" ON "_pages_v_blocks_pricing_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_step_order_idx" ON "_pages_v_blocks_process_step" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_step_parent_id_idx" ON "_pages_v_blocks_process_step" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_step_path_idx" ON "_pages_v_blocks_process_step" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_step_image_idx" ON "_pages_v_blocks_process_step" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_contact_intro_order_idx" ON "_pages_v_blocks_contact_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_intro_parent_id_idx" ON "_pages_v_blocks_contact_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_intro_path_idx" ON "_pages_v_blocks_contact_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_details_order_idx" ON "_pages_v_blocks_contact_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_details_parent_id_idx" ON "_pages_v_blocks_contact_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_details_path_idx" ON "_pages_v_blocks_contact_details" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_map_order_idx" ON "_pages_v_blocks_contact_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_map_parent_id_idx" ON "_pages_v_blocks_contact_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_map_path_idx" ON "_pages_v_blocks_contact_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_weekly_specials_items_order_idx" ON "_pages_v_blocks_weekly_specials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_weekly_specials_items_parent_id_idx" ON "_pages_v_blocks_weekly_specials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_weekly_specials_items_image_idx" ON "_pages_v_blocks_weekly_specials_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_weekly_specials_order_idx" ON "_pages_v_blocks_weekly_specials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_weekly_specials_parent_id_idx" ON "_pages_v_blocks_weekly_specials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_weekly_specials_path_idx" ON "_pages_v_blocks_weekly_specials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_specials_text_order_idx" ON "_pages_v_blocks_specials_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_specials_text_parent_id_idx" ON "_pages_v_blocks_specials_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_specials_text_path_idx" ON "_pages_v_blocks_specials_text" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_w500_sizes_w500_filename_idx" ON "media" USING btree ("sizes_w500_filename");
  CREATE INDEX "media_sizes_w800_sizes_w800_filename_idx" ON "media" USING btree ("sizes_w800_filename");
  CREATE INDEX "media_sizes_w1080_sizes_w1080_filename_idx" ON "media" USING btree ("sizes_w1080_filename");
  CREATE INDEX "media_sizes_w1600_sizes_w1600_filename_idx" ON "media" USING btree ("sizes_w1600_filename");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_desktop_left_links_order_idx" ON "navigation_desktop_left_links" USING btree ("_order");
  CREATE INDEX "navigation_desktop_left_links_parent_id_idx" ON "navigation_desktop_left_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_desktop_left_order_idx" ON "navigation_desktop_left" USING btree ("_order");
  CREATE INDEX "navigation_desktop_left_parent_id_idx" ON "navigation_desktop_left" USING btree ("_parent_id");
  CREATE INDEX "navigation_desktop_right_links_order_idx" ON "navigation_desktop_right_links" USING btree ("_order");
  CREATE INDEX "navigation_desktop_right_links_parent_id_idx" ON "navigation_desktop_right_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_desktop_right_order_idx" ON "navigation_desktop_right" USING btree ("_order");
  CREATE INDEX "navigation_desktop_right_parent_id_idx" ON "navigation_desktop_right" USING btree ("_parent_id");
  CREATE INDEX "navigation_mobile_links_order_idx" ON "navigation_mobile_links" USING btree ("_order");
  CREATE INDEX "navigation_mobile_links_parent_id_idx" ON "navigation_mobile_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_logo_idx" ON "navigation" USING btree ("logo_id");
  CREATE INDEX "navigation__status_idx" ON "navigation" USING btree ("_status");
  CREATE INDEX "_navigation_v_version_desktop_left_links_order_idx" ON "_navigation_v_version_desktop_left_links" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_desktop_left_links_parent_id_idx" ON "_navigation_v_version_desktop_left_links" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_desktop_left_order_idx" ON "_navigation_v_version_desktop_left" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_desktop_left_parent_id_idx" ON "_navigation_v_version_desktop_left" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_desktop_right_links_order_idx" ON "_navigation_v_version_desktop_right_links" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_desktop_right_links_parent_id_idx" ON "_navigation_v_version_desktop_right_links" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_desktop_right_order_idx" ON "_navigation_v_version_desktop_right" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_desktop_right_parent_id_idx" ON "_navigation_v_version_desktop_right" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_mobile_links_order_idx" ON "_navigation_v_version_mobile_links" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_mobile_links_parent_id_idx" ON "_navigation_v_version_mobile_links" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_version_logo_idx" ON "_navigation_v" USING btree ("version_logo_id");
  CREATE INDEX "_navigation_v_version_version__status_idx" ON "_navigation_v" USING btree ("version__status");
  CREATE INDEX "_navigation_v_created_at_idx" ON "_navigation_v" USING btree ("created_at");
  CREATE INDEX "_navigation_v_updated_at_idx" ON "_navigation_v" USING btree ("updated_at");
  CREATE INDEX "_navigation_v_latest_idx" ON "_navigation_v" USING btree ("latest");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE INDEX "_footer_v_version_columns_links_order_idx" ON "_footer_v_version_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_links_parent_id_idx" ON "_footer_v_version_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_columns_order_idx" ON "_footer_v_version_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_columns_parent_id_idx" ON "_footer_v_version_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_version_logo_idx" ON "_footer_v" USING btree ("version_logo_id");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "contact_details__status_idx" ON "contact_details" USING btree ("_status");
  CREATE INDEX "_contact_details_v_version_version__status_idx" ON "_contact_details_v" USING btree ("version__status");
  CREATE INDEX "_contact_details_v_created_at_idx" ON "_contact_details_v" USING btree ("created_at");
  CREATE INDEX "_contact_details_v_updated_at_idx" ON "_contact_details_v" USING btree ("updated_at");
  CREATE INDEX "_contact_details_v_latest_idx" ON "_contact_details_v" USING btree ("latest");
  CREATE INDEX "meat_cutting_stats_order_idx" ON "meat_cutting_stats" USING btree ("_order");
  CREATE INDEX "meat_cutting_stats_parent_id_idx" ON "meat_cutting_stats" USING btree ("_parent_id");
  CREATE INDEX "meat_cutting_feature_feature_image_idx" ON "meat_cutting" USING btree ("feature_image_id");
  CREATE INDEX "meat_cutting__status_idx" ON "meat_cutting" USING btree ("_status");
  CREATE INDEX "_meat_cutting_v_version_stats_order_idx" ON "_meat_cutting_v_version_stats" USING btree ("_order");
  CREATE INDEX "_meat_cutting_v_version_stats_parent_id_idx" ON "_meat_cutting_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_meat_cutting_v_version_feature_version_feature_image_idx" ON "_meat_cutting_v" USING btree ("version_feature_image_id");
  CREATE INDEX "_meat_cutting_v_version_version__status_idx" ON "_meat_cutting_v" USING btree ("version__status");
  CREATE INDEX "_meat_cutting_v_created_at_idx" ON "_meat_cutting_v" USING btree ("created_at");
  CREATE INDEX "_meat_cutting_v_updated_at_idx" ON "_meat_cutting_v" USING btree ("updated_at");
  CREATE INDEX "_meat_cutting_v_latest_idx" ON "_meat_cutting_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_internal_header" CASCADE;
  DROP TABLE "pages_blocks_section_heading" CASCADE;
  DROP TABLE "pages_blocks_community_tagline" CASCADE;
  DROP TABLE "pages_blocks_meat_cutting" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_home_intro_stats" CASCADE;
  DROP TABLE "pages_blocks_home_intro" CASCADE;
  DROP TABLE "pages_blocks_home_meat_cuts_tabs_items" CASCADE;
  DROP TABLE "pages_blocks_home_meat_cuts_tabs" CASCADE;
  DROP TABLE "pages_blocks_home_meat_cuts" CASCADE;
  DROP TABLE "pages_blocks_about_intro" CASCADE;
  DROP TABLE "pages_blocks_about_text" CASCADE;
  DROP TABLE "pages_blocks_about_core_people" CASCADE;
  DROP TABLE "pages_blocks_about_core" CASCADE;
  DROP TABLE "pages_blocks_farm_slaughter_promo_items" CASCADE;
  DROP TABLE "pages_blocks_farm_slaughter_promo" CASCADE;
  DROP TABLE "pages_blocks_awards_logos" CASCADE;
  DROP TABLE "pages_blocks_awards" CASCADE;
  DROP TABLE "pages_blocks_category_intro_list_columns_items" CASCADE;
  DROP TABLE "pages_blocks_category_intro_list_columns" CASCADE;
  DROP TABLE "pages_blocks_category_intro" CASCADE;
  DROP TABLE "pages_blocks_pack_cards_cards_rows" CASCADE;
  DROP TABLE "pages_blocks_pack_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_pack_cards" CASCADE;
  DROP TABLE "pages_blocks_sub_products_items" CASCADE;
  DROP TABLE "pages_blocks_sub_products" CASCADE;
  DROP TABLE "pages_blocks_charcuterie_offerings_cards" CASCADE;
  DROP TABLE "pages_blocks_charcuterie_offerings" CASCADE;
  DROP TABLE "pages_blocks_detail_page_slides" CASCADE;
  DROP TABLE "pages_blocks_detail_page" CASCADE;
  DROP TABLE "pages_blocks_most_viewed_cards" CASCADE;
  DROP TABLE "pages_blocks_most_viewed" CASCADE;
  DROP TABLE "pages_blocks_cutting_intro_cards" CASCADE;
  DROP TABLE "pages_blocks_cutting_intro" CASCADE;
  DROP TABLE "pages_blocks_cutting_prices_cards_rows" CASCADE;
  DROP TABLE "pages_blocks_cutting_prices_cards" CASCADE;
  DROP TABLE "pages_blocks_cutting_prices" CASCADE;
  DROP TABLE "pages_blocks_pricing_grid_cards_rows" CASCADE;
  DROP TABLE "pages_blocks_pricing_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_pricing_grid" CASCADE;
  DROP TABLE "pages_blocks_process_step" CASCADE;
  DROP TABLE "pages_blocks_contact_intro" CASCADE;
  DROP TABLE "pages_blocks_contact_details" CASCADE;
  DROP TABLE "pages_blocks_contact_map" CASCADE;
  DROP TABLE "pages_blocks_weekly_specials_items" CASCADE;
  DROP TABLE "pages_blocks_weekly_specials" CASCADE;
  DROP TABLE "pages_blocks_specials_text" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_internal_header" CASCADE;
  DROP TABLE "_pages_v_blocks_section_heading" CASCADE;
  DROP TABLE "_pages_v_blocks_community_tagline" CASCADE;
  DROP TABLE "_pages_v_blocks_meat_cutting" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_home_intro_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_home_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_home_meat_cuts_tabs_items" CASCADE;
  DROP TABLE "_pages_v_blocks_home_meat_cuts_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_home_meat_cuts" CASCADE;
  DROP TABLE "_pages_v_blocks_about_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_about_text" CASCADE;
  DROP TABLE "_pages_v_blocks_about_core_people" CASCADE;
  DROP TABLE "_pages_v_blocks_about_core" CASCADE;
  DROP TABLE "_pages_v_blocks_farm_slaughter_promo_items" CASCADE;
  DROP TABLE "_pages_v_blocks_farm_slaughter_promo" CASCADE;
  DROP TABLE "_pages_v_blocks_awards_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_awards" CASCADE;
  DROP TABLE "_pages_v_blocks_category_intro_list_columns_items" CASCADE;
  DROP TABLE "_pages_v_blocks_category_intro_list_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_category_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_pack_cards_cards_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_pack_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pack_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_sub_products_items" CASCADE;
  DROP TABLE "_pages_v_blocks_sub_products" CASCADE;
  DROP TABLE "_pages_v_blocks_charcuterie_offerings_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_charcuterie_offerings" CASCADE;
  DROP TABLE "_pages_v_blocks_detail_page_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_detail_page" CASCADE;
  DROP TABLE "_pages_v_blocks_most_viewed_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_most_viewed" CASCADE;
  DROP TABLE "_pages_v_blocks_cutting_intro_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cutting_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_cutting_prices_cards_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_cutting_prices_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cutting_prices" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_grid_cards_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_process_step" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_details" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_map" CASCADE;
  DROP TABLE "_pages_v_blocks_weekly_specials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_weekly_specials" CASCADE;
  DROP TABLE "_pages_v_blocks_specials_text" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_desktop_left_links" CASCADE;
  DROP TABLE "navigation_desktop_left" CASCADE;
  DROP TABLE "navigation_desktop_right_links" CASCADE;
  DROP TABLE "navigation_desktop_right" CASCADE;
  DROP TABLE "navigation_mobile_links" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "_navigation_v_version_desktop_left_links" CASCADE;
  DROP TABLE "_navigation_v_version_desktop_left" CASCADE;
  DROP TABLE "_navigation_v_version_desktop_right_links" CASCADE;
  DROP TABLE "_navigation_v_version_desktop_right" CASCADE;
  DROP TABLE "_navigation_v_version_mobile_links" CASCADE;
  DROP TABLE "_navigation_v" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "_footer_v_version_columns_links" CASCADE;
  DROP TABLE "_footer_v_version_columns" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "contact_details" CASCADE;
  DROP TABLE "_contact_details_v" CASCADE;
  DROP TABLE "meat_cutting_stats" CASCADE;
  DROP TABLE "meat_cutting" CASCADE;
  DROP TABLE "_meat_cutting_v_version_stats" CASCADE;
  DROP TABLE "_meat_cutting_v" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_process_step_image_side";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_process_step_image_side";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_navigation_desktop_left_type";
  DROP TYPE "public"."enum_navigation_desktop_right_type";
  DROP TYPE "public"."enum_navigation_status";
  DROP TYPE "public"."enum__navigation_v_version_desktop_left_type";
  DROP TYPE "public"."enum__navigation_v_version_desktop_right_type";
  DROP TYPE "public"."enum__navigation_v_version_status";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_status";
  DROP TYPE "public"."enum_contact_details_status";
  DROP TYPE "public"."enum__contact_details_v_version_status";
  DROP TYPE "public"."enum_meat_cutting_status";
  DROP TYPE "public"."enum__meat_cutting_v_version_status";`)
}
