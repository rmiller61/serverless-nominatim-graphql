import AWS from 'aws-sdk'
import { GeoArea } from '../../generated/graphql'

async function getGeoArea(_: unknown, input: { id: string }): Promise<GeoArea> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  const params = {
    TableName: process.env.GEOAREAS_TABLE,
    Key: {
      itemId: input.id,
    },
  }

  const { Item } = await dynamoDb.get(params).promise()

  return {
    ...Item,
    itemId: Item.itemId,
  }
}

export default getGeoArea
