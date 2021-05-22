import { Stack, App, Duration } from "@aws-cdk/core"
import { BastionHostLinux, IVpc, Port } from "@aws-cdk/aws-ec2"
import {
    Credentials,
    DatabaseClusterEngine,
    ParameterGroup,
    ServerlessCluster,
} from "@aws-cdk/aws-rds"

interface Props {
    vpc: IVpc
    bastion: BastionHostLinux
}

export class DatabaseService extends Stack {
    constructor(scope: App, props: Props) {
        super(scope, "database-service")
        const cluster = new ServerlessCluster(this, "serverless-db", {
            engine: DatabaseClusterEngine.AURORA_POSTGRESQL,
            parameterGroup: ParameterGroup.fromParameterGroupName(
                this,
                "ParameterGroup",
                "default.aurora-postgresql10"
            ),
            defaultDatabaseName: "serverless",
            vpc: props.vpc,
            scaling: { autoPause: Duration.seconds(0) },
            credentials: Credentials.fromGeneratedSecret("serverless"),
        })

        cluster.connections.allowFrom(
            props.bastion.connections,
            Port.tcp(cluster.clusterEndpoint.port),
            "Bastion host connection"
        )
    }
}
