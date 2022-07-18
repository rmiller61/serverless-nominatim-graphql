import AWS from 'aws-sdk'
import { GeoArea, UpdateGeoAreaInput } from '../../generated/graphql'

async function updateItem(
  _: unknown,
  { input: {
    id,
    city,
    county,
    geoJson,
    geonameId,
    latitude,
    longitude,
    state,
    zipCodes,
  } }: { input: UpdateGeoAreaInput },
): Promise<GeoArea> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  const params = {
    TableName: process.env.ITEM_TABLE,
    Key: {
      itemId: id,
    },
    UpdateExpression: 'SET content = :content',
    ExpressionAttributeValues: {
      ':city': city || null,
      ':state': state || null,
      ':zipCodes': zipCodes || [],
      ':county': county || null,
      ':latitude': latitude || null,
      ':longitude': longitude || null,
      ':geoJson': geoJson || {},
      ':geonameId': geonameId || null,
    },
    ReturnValues: 'ALL_NEW',
  }

  const { Attributes } = await dynamoDb.update(params).promise()

  return {
    ...Attributes,
    id: Attributes.itemId,
  }
}

export default updateItem