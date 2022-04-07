"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const Backendhira = require("../lib/backendhira-stack");
const request = require('supertest');
const app = require('../server/server.js');
// Test case for checking Lambda function
test('AWS Lambda', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Backendhira.BackendhiraStack(app, 'MyTestStack');
    // THEN
    const template = cdk.assertions.Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::Function', 2);
});
// Test cases for get function
describe('GET', function () {
    it('Get reqiest recieved and responds with json', function (done) {
        request(app)
            .get('/')
            .send()
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});
// // Test cases for post function
// describe('POST', function() {
//   it('POST reqiest recieved and responds with json', function(done) {
//     request(app)
//           .post('/')
//           .send({urls:"www.google.com"})
//           .set('Accept', 'application/json')
//           .expect(200, done);
//       });
// });
// // Test case for update function
// describe('Update', function() {
//   it('Update reqiest recieved and responds with json', function(done) {
//     request(app)
//           .put('/')
//           .send({url:"www.google.com",updatedurl:"www.youtube.com"})
//           .set('Accept', 'application/json')
//           .expect(200, done);
//   });
// });
// Test case for delete function
// describe('Delete', function() {
//   it('Delete reqiest recieved and responds with json', function(done) {
//     request(app)
//           .delete('/:"www.youtube.com"')
//           .send()
//           .set('Accept', 'application/json')
//           .expect(200, done);
//   });
// });
// Content-Type: application/json
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZGhpcmEudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tlbmRoaXJhLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFDbkMsd0RBQXdEO0FBRXhELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUUzQyx5Q0FBeUM7QUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDcEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsT0FBTztJQUNQLE1BQU0sS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNuRSxPQUFPO0lBQ1AsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELFFBQVEsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFHSCw4QkFBOEI7QUFDOUIsUUFBUSxDQUFDLEtBQUssRUFBRTtJQUNkLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxVQUFTLElBQUk7UUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQzthQUVMLEdBQUcsQ0FBQyxHQUFHLENBQUM7YUFDUixJQUFJLEVBQUU7YUFDTixHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO2FBQ2pDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUdILGtDQUFrQztBQUNsQyxnQ0FBZ0M7QUFDaEMsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUVuQix1QkFBdUI7QUFDdkIsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxnQ0FBZ0M7QUFDaEMsWUFBWTtBQUNaLE1BQU07QUFHTixtQ0FBbUM7QUFDbkMsa0NBQWtDO0FBQ2xDLDBFQUEwRTtBQUMxRSxtQkFBbUI7QUFFbkIsc0JBQXNCO0FBQ3RCLHVFQUF1RTtBQUN2RSwrQ0FBK0M7QUFDL0MsZ0NBQWdDO0FBQ2hDLFFBQVE7QUFDUixNQUFNO0FBR04sZ0NBQWdDO0FBQ2hDLGtDQUFrQztBQUNsQywwRUFBMEU7QUFDMUUsbUJBQW1CO0FBRW5CLDJDQUEyQztBQUMzQyxvQkFBb0I7QUFDcEIsK0NBQStDO0FBQy9DLGdDQUFnQztBQUNoQyxRQUFRO0FBQ1IsTUFBTTtBQUVOLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBCYWNrZW5kaGlyYSBmcm9tICcuLi9saWIvYmFja2VuZGhpcmEtc3RhY2snO1xuXG5jb25zdCByZXF1ZXN0ID0gcmVxdWlyZSgnc3VwZXJ0ZXN0Jyk7XG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9zZXJ2ZXIvc2VydmVyLmpzJyk7XG5cbi8vIFRlc3QgY2FzZSBmb3IgY2hlY2tpbmcgTGFtYmRhIGZ1bmN0aW9uXG50ZXN0KCdBV1MgTGFtYmRhJywgKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgLy8gV0hFTlxuICAgIGNvbnN0IHN0YWNrID0gbmV3IEJhY2tlbmRoaXJhLkJhY2tlbmRoaXJhU3RhY2soYXBwLCAnTXlUZXN0U3RhY2snKTtcbiAgICAvLyBUSEVOXG4gICAgY29uc3QgdGVtcGxhdGUgPSBjZGsuYXNzZXJ0aW9ucy5UZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcygnQVdTOjpMYW1iZGE6OkZ1bmN0aW9uJywgMik7XG4gIH0pO1xuXG4gIFxuICAvLyBUZXN0IGNhc2VzIGZvciBnZXQgZnVuY3Rpb25cbiAgZGVzY3JpYmUoJ0dFVCcsIGZ1bmN0aW9uKCkge1xuICAgIGl0KCdHZXQgcmVxaWVzdCByZWNpZXZlZCBhbmQgcmVzcG9uZHMgd2l0aCBqc29uJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgcmVxdWVzdChhcHApXG5cbiAgICAgICAgICAgIC5nZXQoJy8nKVxuICAgICAgICAgICAgLnNlbmQoKVxuICAgICAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAgICAgICAgICAgLmV4cGVjdCgyMDAsIGRvbmUpO1xuICAgIH0pO1xuICB9KTtcblxuXG4gIC8vIC8vIFRlc3QgY2FzZXMgZm9yIHBvc3QgZnVuY3Rpb25cbiAgLy8gZGVzY3JpYmUoJ1BPU1QnLCBmdW5jdGlvbigpIHtcbiAgLy8gICBpdCgnUE9TVCByZXFpZXN0IHJlY2lldmVkIGFuZCByZXNwb25kcyB3aXRoIGpzb24nLCBmdW5jdGlvbihkb25lKSB7XG4gIC8vICAgICByZXF1ZXN0KGFwcClcblxuICAvLyAgICAgICAgICAgLnBvc3QoJy8nKVxuICAvLyAgICAgICAgICAgLnNlbmQoe3VybHM6XCJ3d3cuZ29vZ2xlLmNvbVwifSlcbiAgLy8gICAgICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAgLy8gICAgICAgICAgIC5leHBlY3QoMjAwLCBkb25lKTtcbiAgLy8gICAgICAgfSk7XG4gIC8vIH0pO1xuXG5cbiAgLy8gLy8gVGVzdCBjYXNlIGZvciB1cGRhdGUgZnVuY3Rpb25cbiAgLy8gZGVzY3JpYmUoJ1VwZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAvLyAgIGl0KCdVcGRhdGUgcmVxaWVzdCByZWNpZXZlZCBhbmQgcmVzcG9uZHMgd2l0aCBqc29uJywgZnVuY3Rpb24oZG9uZSkge1xuICAvLyAgICAgcmVxdWVzdChhcHApXG5cbiAgLy8gICAgICAgICAgIC5wdXQoJy8nKVxuICAvLyAgICAgICAgICAgLnNlbmQoe3VybDpcInd3dy5nb29nbGUuY29tXCIsdXBkYXRlZHVybDpcInd3dy55b3V0dWJlLmNvbVwifSlcbiAgLy8gICAgICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAgLy8gICAgICAgICAgIC5leHBlY3QoMjAwLCBkb25lKTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG5cblxuICAvLyBUZXN0IGNhc2UgZm9yIGRlbGV0ZSBmdW5jdGlvblxuICAvLyBkZXNjcmliZSgnRGVsZXRlJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgaXQoJ0RlbGV0ZSByZXFpZXN0IHJlY2lldmVkIGFuZCByZXNwb25kcyB3aXRoIGpzb24nLCBmdW5jdGlvbihkb25lKSB7XG4gIC8vICAgICByZXF1ZXN0KGFwcClcblxuICAvLyAgICAgICAgICAgLmRlbGV0ZSgnLzpcInd3dy55b3V0dWJlLmNvbVwiJylcbiAgLy8gICAgICAgICAgIC5zZW5kKClcbiAgLy8gICAgICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAgLy8gICAgICAgICAgIC5leHBlY3QoMjAwLCBkb25lKTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG5cbiAgLy8gQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uIl19