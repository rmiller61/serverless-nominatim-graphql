import AWS from 'aws-sdk'
import { DeleteItemInput, Item } from '../../generated/graphql'

async function deleteItem(
  _: unknown,
  { input }: { input: DeleteItemInput },
): Promise<Item> {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  const params = {
    TableName: process.env.GEOAREAS_TABLE,
    Key: {
      itemId: input.id,
    },
    ReturnValues: 'ALL_OLD',
  }

  const { Attributes } = await dynamoDb.delete(params).promise()

  return {
    ...Attributes,
    id: Attributes.itemId,
  }
}

export default deleteItem
