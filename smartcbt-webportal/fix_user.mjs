// fix_user.mjs
const CMS_URL = "https://dmc.smartcbt.dasta.or.th";
const ADMIN_TOKEN = "wRL7ymYaTZUYn5JpKvboFgw_EWyPs4f0";
const EMAIL_TO_FIND = "Ayopee001@gmail.com";

async function main() {
  try {
    const url = `${CMS_URL}/items/users?filter[email][_eq]=${EMAIL_TO_FIND}&fields=id,email,status,directus_user,mobile,thai_national_id_card,firstname,lastname,mtoken_id`;
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${ADMIN_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    
    const data = await response.json();
    console.log("Current User Data:", JSON.stringify(data, null, 2));

    if (data.data && data.data.length > 0) {
      const user = data.data[0];
      console.log(`\nFound User ID: ${user.id}.`);
    } else {
      console.log("User not found!");
    }
    
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
