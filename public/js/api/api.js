import { ENV } from "./env.js";


console.log("Environnement");
console.table(ENV);

const apiEndPoint = ENV.API_BASE_URL;
const isLocal = ( ENV.MODE == "dev" )

export async function getRecords(table) {
  const endpoint = isLocal
    ? `/public/data/${table}.json`
    : `${apiEndPoint}/${table}/all`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} on ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching records for table="${table}"`, error);
    return { records: [] };
  }
}

export async function getRecordsByDomain(table, domainId) {
  const endpoint = isLocal
    ? `/public/data/${table}.json`
    : `${apiEndPoint}/domain/${domainId}/${table}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} on ${endpoint}`);
    }

    const data = await response.json();

    if (!isLocal) {
      return data;
    }

    return {
      records: (data.records || []).filter(record =>
        (record.fields.domain_id || []).includes(domainId)
      )
    };
  } catch (error) {
    console.error(
      `Error fetching records for table="${table}" and domainId="${domainId}"`,
      error
    );
    return { records: [] };
  }
}