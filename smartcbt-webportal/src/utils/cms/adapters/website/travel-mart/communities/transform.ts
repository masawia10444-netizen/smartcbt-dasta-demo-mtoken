import jsonata from "jsonata";
import * as _ from "lodash";
import { Community, CommunityRecommend, Organization, OrganizationRecommend } from "../types/travel-mart";

export async function transformCommunityProjectInfo(_communities: Community) {
  // console.log("transform", JSON.stringify(_communities));
  const expression = jsonata(`
    $.{
      'id': id,
      'title': title,
      'description': description,
      'featured_image': {
        'id': featured_image.id,
        'url': featured_image.filename_disk,
        'type': featured_image.type
      },
      'tourism_activities':
        $count(tourism_activities) = 1
        ? tourism_activities.[{
          'id': id,
          'title': title
        }] : $count(galleries) > 1 ?
        tourism_activities.{
          'id': id,
          'title': title
        } : null,
      'galleries':
        $count(galleries) = 1
        ? galleries.directus_files_id.[{
          'id': id,
          'url': filename_disk,
          'type': type
        }] : $count(galleries) > 1 ?
        galleries.directus_files_id.{
          'id': id,
          'url': filename_disk,
          'type': type
        } : null,
      'tourism_info': {
        'tourist_accomodate_min': tourist_accomodate_min,
        'tourist_accomodate_max': tourist_accomodate_max,
        'traveling_recommended_during': $count(traveling_recommended_during) = 1
        ? traveling_recommended_during.[{
          'id': months_id.id,
          'title': months_id.translations[languages_code='th-TH'].title
        }] : $count(awards) > 1 ?
        traveling_recommended_during.{
          'id': months_id.id,
          'title': months_id.translations[languages_code='th-TH'].title
        } : null,
        'address_info': {
          'address_1': organization.address_1,
          'address_2': organization.address_2,
          'province': organization.province.title,
          'district': organization.district.title,
          'subdistrict': organization.subdistrict.title,
          'postal_code': organization.postal_code
        }
      },
      'awards': $count(awards) = 1
        ? awards.[{
          'id': awards_id.id,
          'title': awards_id.translations[languages_code='th-TH'].title
        }] : $count(awards) > 1 ?
        awards.{
          'id': awards_id.id,
          'title': awards_id.translations[languages_code='th-TH'].title
        } : null,
      'attraction_type': $count(attraction_type) = 1
        ? attraction_type.[{
          'id': community_tourist_attraction_type_id.id,
          'title': community_tourist_attraction_type_id.title,
          'titleshort': community_tourist_attraction_type_id.titleshort
        }] : $count(attraction_type) > 1 ?
        attraction_type.{
          'id': community_tourist_attraction_type_id.id,
          'title': community_tourist_attraction_type_id.title,
          'titleshort': community_tourist_attraction_type_id.titleshort
        } : null,
      'community_way_of_life': {
        'way_of_life': community_way_of_life,
        'local_language': community_local_language,
        'food_menus': $count(food_menus) > 0 ? $join(food_menus.title, ',') : null,
        'products': $count(tourism_products) > 0 ? $join(tourism_products.title, ',') : null
      },
      'presentations': {
        'files': $count(presentations) > 1 ? presentations.{
        'id': id,
        'url': directus_files_id.filename_disk,
        'type': directus_files_id.type
        } : presentations.[{
          'id': id,
          'url': directus_files_id.filename_disk,
          'type': directus_files_id.type
        }],
        'video': presentation_video,
        'facebook': presentation_facebook,
        'instagram': presentation_instagram,
        'tiktok': presentation_tiktok,
        'other': presentation_other
      },
      'facilities': $count(facilities) = 1 ?
        facilities.[{
          'id': facility.id,
          'title': facility.translations[languages_code='th-TH'].title,
          'quantity': quantity,
          'quantity_flag': facility.quantity_flag,
          'unit_quantity': facility.unit_quantity.translations[languages_code='th-TH'].title,
          'size': size,
          'size_flag': facility.size_flag,
          'unit_size': facility.unit_size.translations[languages_code='th-TH'].title,
          'group': facility.group ? facility.group.{
            'id': id,
            'title': translations[languages_code='th-TH'].title ? translations[languages_code='th-TH'].title : null
          } : null
        }] : $count(facilities) > 1 ?
        facilities.{
          'id': facility.id,
          'title': facility.translations[languages_code='th-TH'].title,
          'quantity': quantity,
          'quantity_flag': facility.quantity_flag,
          'unit_quantity': facility.unit_quantity ? facility.unit_quantity.translations[languages_code='th-TH'].title : null,
          'size': size,
          'size_flag': facility.size_flag,
          'unit_size': facility.unit_size ? facility.unit_size.translations[languages_code='th-TH'].title : null,
          'group': facility.group ? facility.group.{
            'id': id,
            'title': translations[languages_code='th-TH'].title ? translations[languages_code='th-TH'].title : null
          } : null
        } : null,
      'contacts': contacts,
      'tour_agent': tour_agent,
      'highlight': highlight
    }
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(_communities);
  return result;
}

export function transformCommunityProject(_communities: Community[]): CommunityRecommend[] {
  return _.isEmpty(_communities)
    ? []
    : _communities.map((communitiy): CommunityRecommend => {
        return {
          id: Number(communitiy.id),
          status: communitiy.status,
          organization: _.isEmpty(communitiy.organization)
            ? {}
            : {
                title: _.get(communitiy.organization, "title"),
                province: _.get(communitiy.organization, "province.title"),
                attraction_types: _.get(communitiy.organization, "attraction_types", []).map(
                  (attraction: {
                    organizations_id: number;
                    community_tourist_attraction_type_id: number;
                    id: number;
                  }) => {
                    return { community_tourist_attraction_type_id: attraction.community_tourist_attraction_type_id };
                  }
                ),
              },
          projects: {}, // FIXME: not use now,
          description: communitiy.description,
          featured_image: _.isEmpty(communitiy.featured_image)
            ? {}
            : {
                src: _.get(communitiy.featured_image, "filename_disk", null),
                title: _.get(communitiy.featured_image, "title", null),
                alt: _.get(communitiy.featured_image, "title", null),
              },
          link: _.isEmpty(communitiy.presentations)
            ? {}
            : {
                presentation_asset: _.get(communitiy.presentations, "directus_files_id.filename_disk", null),
                video_url: _.get(communitiy, "presentation_video", null),
              },
        };
      });
}

export function transformOrganizationRecommend(_organization: Organization[]): OrganizationRecommend[] {
  return _.isEmpty(_organization)
    ? []
    : _organization.map((organization): OrganizationRecommend => {
        return {
          id: Number(organization.id) ?? 0,
          status: organization.status ?? "-",
          title: organization.title ?? "-",
          province: _.get(organization, ["province", "title"], null),
          attraction_types: _.get(organization, "attraction_types", []).map((attraction) => {
            return {
              community_tourist_attraction_type_id: _.get(attraction, "community_tourist_attraction_type_id.id", 0),
            };
          }),
        };
      });
}

export async function transformOrganization(_organization: Organization[]): Promise<OrganizationRecommend[]> {
  // console.log("transform", _communities);

  // {
  //   title: string | null | undefined;
  //   province_id: any;
  //   province_title: any;
  //   district_id: any;
  //   district_title: any;
  //   subdistrict_id: any;
  //   subdistrict_title: any;
  //   postal_code: any;
  //   latitude: any;
  //   longitude: any;
  // }

  const expression = jsonata(`
    $.{
      'id': id,
      'title': title,
      'province_id': province.id,
      'province_title': province.title,
      'region_id': province.region.id,
      'region_title': province.region.title,
      'district_id': district.id,
      'district_title': district.title,
      'subdistrict_id': subdistrict.id,
      'subdistrict_title': subdistrict.title,
      'postal_code': postal_code,
      'latitude': latitude,
      'longitude': latitude
    }
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(_organization);
  // console.log(result);
  return result;
}

export async function transformCommunity(_communities: Community) {
  const expression = jsonata(`
    $.{
        'id': id,
        'title': organization.title,
        'province_title': organization.province.title,
        'organization_id': organization.id
    }
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(_communities);
  // console.log(result);
  return result;
}
