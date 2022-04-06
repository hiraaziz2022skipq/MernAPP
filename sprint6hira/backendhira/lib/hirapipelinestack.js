"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hirapipelinestack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cdk = require("aws-cdk-lib");
const aws_codepipeline_actions_1 = require("aws-cdk-lib/aws-codepipeline-actions");
const hirastagestack_1 = require("./hirastagestack");
const pipelines_1 = require("aws-cdk-lib/pipelines");
// const {Hirastagestack}=require('./hirastagestack')
const app = new cdk.App();
class Hirapipelinestack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Using Secrets Manager to provide the access token to authenticate to GitHub
        const input = aws_cdk_lib_1.pipelines.CodePipelineSource.gitHub('hiraaziz2022skipq/MernApp', "main", {
            authentication: cdk.SecretValue.secretsManager('webtken'),
            trigger: aws_codepipeline_actions_1.GitHubTrigger.POLL,
        });
        /**
        ShellStep()
                                            
        id -> 'synth'
        input -> source
        commands -> commands to run in pipeline
        primary_output_directory -> : Directory that will contain primary output fileset when script run
        
        **/
        const synth = new aws_cdk_lib_1.pipelines.ShellStep('Synth', {
            input: input,
            commands: ["cd hira4sprint", "npm ci", "npx cdk synth"],
            primaryOutputDirectory: "hira4sprint/cdk.out"
        });
        // Connecting to the github
        const pipeline = new aws_cdk_lib_1.pipelines.CodePipeline(this, 'Pipeline', { synth: synth });
        // Adding Test and commands
        const unit_test = new pipelines_1.ShellStep("Unit_Test", {
            commands: ["cd hira4sprint", "npm ci", "npm run test"]
        });
        // Instantiate Beta stage
        const stagebeta = new hirastagestack_1.Hirastagestack(this, "betastage");
        // Adding beta stage to the pipeline and  unit test as pre stage
        pipeline.addStage(stagebeta, { pre: [unit_test] });
        // Creating Production stage
        const prod = new hirastagestack_1.Hirastagestack(this, "prod");
        // Adding product to pipeline and manual approval as pre stage
        pipeline.addStage(prod, { pre: [new pipelines_1.ManualApprovalStep("Waiting for your approval")] });
    }
}
exports.Hirapipelinestack = Hirapipelinestack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlyYXBpcGVsaW5lc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaXJhcGlwZWxpbmVzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBbUY7QUFJbkYsbUNBQW1DO0FBQ25DLG1GQUFxRTtBQUNyRSxxREFBK0M7QUFDL0MscURBQXNFO0FBQ3RFLHFEQUFxRDtBQUNyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUxQixNQUFhLGlCQUFrQixTQUFRLG1CQUFLO0lBQ3hDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFHeEIsOEVBQThFO1FBQzlFLE1BQU0sS0FBSyxHQUFHLHVCQUFTLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFLE1BQU0sRUFBQztZQUNoRCxjQUFjLEVBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1lBQ3hELE9BQU8sRUFBQyx3Q0FBYSxDQUFDLElBQUk7U0FBRSxDQUFDLENBQUE7UUFFakU7Ozs7Ozs7O1dBUUc7UUFFTCxNQUFNLEtBQUssR0FBRyxJQUFJLHVCQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUMvQixLQUFLLEVBQUUsS0FBSztZQUNaLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixFQUFDLFFBQVEsRUFBQyxlQUFlLENBQUM7WUFDckQsc0JBQXNCLEVBQUcscUJBQXFCO1NBQUMsQ0FBQyxDQUFBO1FBRWhFLDJCQUEyQjtRQUMzQixNQUFNLFFBQVEsR0FBRyxJQUFJLHVCQUFTLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUU1RSwyQkFBMkI7UUFDM0IsTUFBTSxTQUFTLEdBQUUsSUFBSSxxQkFBUyxDQUFDLFdBQVcsRUFBQztZQUN6QyxRQUFRLEVBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsY0FBYyxDQUFDO1NBQ3BELENBQUMsQ0FBQTtRQUdKLHlCQUF5QjtRQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLCtCQUFjLENBQUMsSUFBSSxFQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3RELGdFQUFnRTtRQUNoRSxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsQ0FBQTtRQUU5Qyw0QkFBNEI7UUFDNUIsTUFBTSxJQUFJLEdBQUMsSUFBSSwrQkFBYyxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQTtRQUMxQyw4REFBOEQ7UUFDOUQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxJQUFJLDhCQUFrQixDQUFDLDJCQUEyQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDckYsQ0FBQztDQUdGO0FBOUNILDhDQThDRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER1cmF0aW9uLCBwaXBlbGluZXMsIFJlbW92YWxQb2xpY3ksIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCB7IE1hbmFnZWRQb2xpY3ksIFJvbGUsIFNlcnZpY2VQcmluY2lwYWwgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcclxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgR2l0SHViVHJpZ2dlciB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9ucyc7XHJcbmltcG9ydCB7SGlyYXN0YWdlc3RhY2t9IGZyb20gJy4vaGlyYXN0YWdlc3RhY2snXHJcbmltcG9ydCB7IE1hbnVhbEFwcHJvdmFsU3RlcCwgU2hlbGxTdGVwIH0gZnJvbSAnYXdzLWNkay1saWIvcGlwZWxpbmVzJztcclxuLy8gY29uc3Qge0hpcmFzdGFnZXN0YWNrfT1yZXF1aXJlKCcuL2hpcmFzdGFnZXN0YWNrJylcclxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBIaXJhcGlwZWxpbmVzdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xyXG4gICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAgIFxyXG4gICAgICAvLyBVc2luZyBTZWNyZXRzIE1hbmFnZXIgdG8gcHJvdmlkZSB0aGUgYWNjZXNzIHRva2VuIHRvIGF1dGhlbnRpY2F0ZSB0byBHaXRIdWJcclxuICAgICAgY29uc3QgaW5wdXQgPSBwaXBlbGluZXMuQ29kZVBpcGVsaW5lU291cmNlLmdpdEh1YignaGlyYWF6aXoyMDIyc2tpcHEvTWVybkFwcCcsIFwibWFpblwiLHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjpjZGsuU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoJ3dlYnRrZW4nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOkdpdEh1YlRyaWdnZXIuUE9MTCx9KVxyXG5cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgU2hlbGxTdGVwKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZCAtPiAnc3ludGgnXHJcbiAgICAgICAgaW5wdXQgLT4gc291cmNlXHJcbiAgICAgICAgY29tbWFuZHMgLT4gY29tbWFuZHMgdG8gcnVuIGluIHBpcGVsaW5lXHJcbiAgICAgICAgcHJpbWFyeV9vdXRwdXRfZGlyZWN0b3J5IC0+IDogRGlyZWN0b3J5IHRoYXQgd2lsbCBjb250YWluIHByaW1hcnkgb3V0cHV0IGZpbGVzZXQgd2hlbiBzY3JpcHQgcnVuXHJcbiAgICAgICAgXHJcbiAgICAgICAgKiovXHJcblxyXG4gICAgICBjb25zdCBzeW50aCA9IG5ldyBwaXBlbGluZXMuU2hlbGxTdGVwKCdTeW50aCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzOiBbXCJjZCBoaXJhNHNwcmludFwiLFwibnBtIGNpXCIsXCJucHggY2RrIHN5bnRoXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeU91dHB1dERpcmVjdG9yeSA6IFwiaGlyYTRzcHJpbnQvY2RrLm91dFwifSlcclxuXHJcbiAgICAgIC8vIENvbm5lY3RpbmcgdG8gdGhlIGdpdGh1YlxyXG4gICAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBwaXBlbGluZXMuQ29kZVBpcGVsaW5lKHRoaXMsICdQaXBlbGluZScsIHtzeW50aDogc3ludGh9KTtcclxuXHJcbiAgICAgICAgLy8gQWRkaW5nIFRlc3QgYW5kIGNvbW1hbmRzXHJcbiAgICAgICAgY29uc3QgdW5pdF90ZXN0PSBuZXcgU2hlbGxTdGVwKFwiVW5pdF9UZXN0XCIse1xyXG4gICAgICAgICAgY29tbWFuZHM6W1wiY2QgaGlyYTRzcHJpbnRcIixcIm5wbSBjaVwiLFwibnBtIHJ1biB0ZXN0XCJdXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAvLyBJbnN0YW50aWF0ZSBCZXRhIHN0YWdlXHJcbiAgICAgIGNvbnN0IHN0YWdlYmV0YSA9IG5ldyBIaXJhc3RhZ2VzdGFjayh0aGlzLFwiYmV0YXN0YWdlXCIpXHJcbiAgICAgIC8vIEFkZGluZyBiZXRhIHN0YWdlIHRvIHRoZSBwaXBlbGluZSBhbmQgIHVuaXQgdGVzdCBhcyBwcmUgc3RhZ2VcclxuICAgICAgcGlwZWxpbmUuYWRkU3RhZ2Uoc3RhZ2ViZXRhLHtwcmU6W3VuaXRfdGVzdF19KVxyXG5cclxuICAgICAgLy8gQ3JlYXRpbmcgUHJvZHVjdGlvbiBzdGFnZVxyXG4gICAgICBjb25zdCBwcm9kPW5ldyBIaXJhc3RhZ2VzdGFjayh0aGlzLFwicHJvZFwiKVxyXG4gICAgICAvLyBBZGRpbmcgcHJvZHVjdCB0byBwaXBlbGluZSBhbmQgbWFudWFsIGFwcHJvdmFsIGFzIHByZSBzdGFnZVxyXG4gICAgICBwaXBlbGluZS5hZGRTdGFnZShwcm9kLHtwcmU6W25ldyBNYW51YWxBcHByb3ZhbFN0ZXAoXCJXYWl0aW5nIGZvciB5b3VyIGFwcHJvdmFsXCIpXX0pXHJcbiAgICB9XHJcbiAgXHJcblxyXG4gIH0iXX0=