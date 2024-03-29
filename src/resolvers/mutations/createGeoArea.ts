import AWS from 'aws-sdk'
import { CreateGeoAreaInput, GeoArea } from '../../generated/graphql'
import { v4 } from 'uuid'

async function createGeoArea(
  _: unknown,
  { input }: { input: CreateGeoAreaInput },
): Promise<GeoArea> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const id = v4()

  const params = {
    TableName: process.env.GEOAREAS_TABLE,
    Item: {
      itemId: id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...input,
    },
  }

  await dynamoDb.put(params).promise()

  return {
    ...input,
    itemId: id,
  }
}

export default createGeoArea
