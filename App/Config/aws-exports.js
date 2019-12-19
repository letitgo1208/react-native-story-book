// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
const awsmobile = {
    'aws_app_analytics': 'enable',
    'aws_auth_facebook': 'enable',
    'aws_cloud_logic': 'enable',
    'aws_cloud_logic_custom': [{"id":"uot3okl62c","name":"Buddys","description":"Buddy App Api","endpoint":"https://uot3okl62c.execute-api.eu-west-2.amazonaws.com/Development","region":"eu-west-2","paths":["/items","/items/123"]}],
    'aws_cognito_identity_pool_id': 'eu-west-2:ee6a2121-2a10-4fc9-bf8f-4ea40b1b666e',
    'aws_cognito_region': 'eu-west-2',
    'aws_content_delivery': 'enable',
    'aws_content_delivery_bucket': 'buddyreact-hosting-mobilehub-496607864',
    'aws_content_delivery_bucket_region': 'eu-west-2',
    'aws_content_delivery_cloudfront': 'enable',
    'aws_content_delivery_cloudfront_domain': 'd3ew8dq567hm7h.cloudfront.net',
    'aws_dynamodb': 'enable',
    'aws_dynamodb_all_tables_region': 'eu-west-2',
    'aws_dynamodb_table_schemas': [{"tableName":"buddyreact-mobilehub-496607864-profile","attributes":[{"name":"userId","type":"S"},{"name":"birthDate","type":"S"},{"name":"email","type":"S"},{"name":"firstName","type":"S"},{"name":"imgUrl","type":"S"},{"name":"lastName","type":"S"}],"indexes":[],"region":"eu-west-2","hashKey":"userId"},{"tableName":"buddyreact-mobilehub-496607864-users","attributes":[{"name":"userId","type":"S"},{"name":"profile","type":"S"}],"indexes":[],"region":"eu-west-2","hashKey":"userId"}],
    'aws_facebook_app_id': '1887935638164716',
    'aws_facebook_app_permissions': 'public_profile',
    'aws_mandatory_sign_in': 'enable',
    'aws_mobile_analytics_app_id': 'ca85cad2c0824e21b53690c27b032fe2',
    'aws_mobile_analytics_app_region': 'us-east-1',
    'aws_project_id': '7b8b6064-a22c-494c-83e2-51324977bddc',
    'aws_project_name': 'buddy-react',
    'aws_project_region': 'eu-west-2',
    'aws_resource_bucket_name': 'buddyreact-deployments-mobilehub-496607864',
    'aws_resource_name_prefix': 'buddyreact-mobilehub-496607864',
    'aws_sign_in_enabled': 'enable',
    'aws_user_files': 'enable',
    'aws_user_files_s3_bucket': 'buddyreact-userfiles-mobilehub-496607864',
    'aws_user_files_s3_bucket_region': 'eu-west-2',
    'aws_user_pools': 'enable',
    'aws_user_pools_id': 'eu-west-2_v0MQz8wMm',
    'aws_user_pools_mfa_type': 'OFF',
    'aws_user_pools_web_client_id': '1db20kk647p0966p479gb4tpl9',
    'aws_user_settings': 'enable',
}

export default awsmobile;
