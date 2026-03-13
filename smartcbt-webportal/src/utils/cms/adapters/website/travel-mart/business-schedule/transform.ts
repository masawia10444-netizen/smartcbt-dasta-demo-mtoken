import jsonata from "jsonata";
import { BusinessAppointmentSlot, BusinessCommunitySchedule, Organization, Schedule } from "../types/travel-mart";

export async function transformSchedule(data: BusinessCommunitySchedule, organizationId?: number): Promise<Schedule> {
  const expression = jsonata(`
      {
        'id': id,
        'start_time': start_time,
        'end_time': end_time,
        'date': date,
        'slot': slot,
        'community_id': community ? community.id : null,
        'community': community.title ? community.title : community.organization.title,
        'organization_by_community': community.organization.id ? community.organization.id : null,
        'organization_id': organization.id,
        'organization_business_type': organization.dasta_business_type.title,
        'request_by': request_by,
        'organization_request': organization_request,
        'community_request': community_request,
        'organization_accept': organization_accept,
        'community_accept': community_accept,
        'organization': organization.title,
        'province': community.organization.province.title,
        'meeting_link': meeting_link,
        'status': schedule_status,
        'has_change_slot': has_change_slot,
        'is_owner': (community.organization.id = '${organizationId}' and request_by = 'community')
          or (organization.id = '${organizationId}' and request_by = 'organization'),
        'note': note,
        'rating': community.organization.id = '${organizationId}'
          ? organization_rating : organization.id = '${organizationId}'
          ? community_rating : 0
      }
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(data);
  // console.log(result);
  return result;
}

export async function transformSlot(data: BusinessAppointmentSlot[]) {
  const expression = jsonata(`
    $sort(data, function($l, $r) {
      $l.date > $r.date
    }){
        \`date\`: $.{
            'id': id,
            'start_time': start_time,
            'end_time': end_time,
            'status': status
        }
    }
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate({ data });
  // console.log(result);
  return result;
}

export async function transformOrganizationInfo(data: Organization) {
  const expression = jsonata(`
    $.{
      'id': id,
      'title': title,
      'dasta_business_type': dasta_business_type,
      'csr_types': $count(csr_types) = 1
          ? csr_types.[{ 'id': csr_types_id.id, 'title': csr_types_id.title}] : $count(csr_types) > 1
          ? csr_types.{ 'id': csr_types_id.id, 'title': csr_types_id.title} : [],
      'contacts': contacts,
      'website': website,
      'instagram_id': instagram_id,
      'facebook_id': facebook_id,
      'line_id': line_id,
      'tiktok_id': tiktok_id,
      'other': other,
      'address_info': {
          'address': address_2 ? address_1 & address_2 : address_1,
          'province': province.title,
          'district': district.title,
          'subdistrict': subdistrict.title,
          'postal_code': postal_code
      },
      'province_title': province.title,
      'latitude': latitude,
      'longitude': longitude,
      'google_map_url': google_map_url
    }
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(data);
  // console.log(result);
  return result;
}
