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
// describe('GET', function() {
//   it('Get reqiest recieved and responds with json', function(done) {
//     request(app)
//           .get('/')
//           .send()
//           .set('Accept', 'application/json')
//           .expect(200, done);
//   });
// });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZGhpcmEudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tlbmRoaXJhLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFDbkMsd0RBQXdEO0FBRXhELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUUzQyx5Q0FBeUM7QUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDcEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsT0FBTztJQUNQLE1BQU0sS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNuRSxPQUFPO0lBQ1AsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELFFBQVEsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFHSCw4QkFBOEI7QUFDOUIsK0JBQStCO0FBQy9CLHVFQUF1RTtBQUN2RSxtQkFBbUI7QUFFbkIsc0JBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQiwrQ0FBK0M7QUFDL0MsZ0NBQWdDO0FBQ2hDLFFBQVE7QUFDUixNQUFNO0FBR04sa0NBQWtDO0FBQ2xDLGdDQUFnQztBQUNoQyx3RUFBd0U7QUFDeEUsbUJBQW1CO0FBRW5CLHVCQUF1QjtBQUN2QiwyQ0FBMkM7QUFDM0MsK0NBQStDO0FBQy9DLGdDQUFnQztBQUNoQyxZQUFZO0FBQ1osTUFBTTtBQUdOLG1DQUFtQztBQUNuQyxrQ0FBa0M7QUFDbEMsMEVBQTBFO0FBQzFFLG1CQUFtQjtBQUVuQixzQkFBc0I7QUFDdEIsdUVBQXVFO0FBQ3ZFLCtDQUErQztBQUMvQyxnQ0FBZ0M7QUFDaEMsUUFBUTtBQUNSLE1BQU07QUFHTixnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLDBFQUEwRTtBQUMxRSxtQkFBbUI7QUFFbkIsMkNBQTJDO0FBQzNDLG9CQUFvQjtBQUNwQiwrQ0FBK0M7QUFDL0MsZ0NBQWdDO0FBQ2hDLFFBQVE7QUFDUixNQUFNO0FBRU4saUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIEJhY2tlbmRoaXJhIGZyb20gJy4uL2xpYi9iYWNrZW5kaGlyYS1zdGFjayc7XG5cbmNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcnRlc3QnKTtcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL3NlcnZlci9zZXJ2ZXIuanMnKTtcblxuLy8gVGVzdCBjYXNlIGZvciBjaGVja2luZyBMYW1iZGEgZnVuY3Rpb25cbnRlc3QoJ0FXUyBMYW1iZGEnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbiAgICAvLyBXSEVOXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgQmFja2VuZGhpcmEuQmFja2VuZGhpcmFTdGFjayhhcHAsICdNeVRlc3RTdGFjaycpO1xuICAgIC8vIFRIRU5cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGNkay5hc3NlcnRpb25zLlRlbXBsYXRlLmZyb21TdGFjayhzdGFjayk7XG4gICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OkxhbWJkYTo6RnVuY3Rpb24nLCAyKTtcbiAgfSk7XG5cbiAgXG4gIC8vIFRlc3QgY2FzZXMgZm9yIGdldCBmdW5jdGlvblxuICAvLyBkZXNjcmliZSgnR0VUJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgaXQoJ0dldCByZXFpZXN0IHJlY2lldmVkIGFuZCByZXNwb25kcyB3aXRoIGpzb24nLCBmdW5jdGlvbihkb25lKSB7XG4gIC8vICAgICByZXF1ZXN0KGFwcClcblxuICAvLyAgICAgICAgICAgLmdldCgnLycpXG4gIC8vICAgICAgICAgICAuc2VuZCgpXG4gIC8vICAgICAgICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gIC8vICAgICAgICAgICAuZXhwZWN0KDIwMCwgZG9uZSk7XG4gIC8vICAgfSk7XG4gIC8vIH0pO1xuXG5cbiAgLy8gLy8gVGVzdCBjYXNlcyBmb3IgcG9zdCBmdW5jdGlvblxuICAvLyBkZXNjcmliZSgnUE9TVCcsIGZ1bmN0aW9uKCkge1xuICAvLyAgIGl0KCdQT1NUIHJlcWllc3QgcmVjaWV2ZWQgYW5kIHJlc3BvbmRzIHdpdGgganNvbicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgLy8gICAgIHJlcXVlc3QoYXBwKVxuXG4gIC8vICAgICAgICAgICAucG9zdCgnLycpXG4gIC8vICAgICAgICAgICAuc2VuZCh7dXJsczpcInd3dy5nb29nbGUuY29tXCJ9KVxuICAvLyAgICAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAvLyAgICAgICAgICAgLmV4cGVjdCgyMDAsIGRvbmUpO1xuICAvLyAgICAgICB9KTtcbiAgLy8gfSk7XG5cblxuICAvLyAvLyBUZXN0IGNhc2UgZm9yIHVwZGF0ZSBmdW5jdGlvblxuICAvLyBkZXNjcmliZSgnVXBkYXRlJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgaXQoJ1VwZGF0ZSByZXFpZXN0IHJlY2lldmVkIGFuZCByZXNwb25kcyB3aXRoIGpzb24nLCBmdW5jdGlvbihkb25lKSB7XG4gIC8vICAgICByZXF1ZXN0KGFwcClcblxuICAvLyAgICAgICAgICAgLnB1dCgnLycpXG4gIC8vICAgICAgICAgICAuc2VuZCh7dXJsOlwid3d3Lmdvb2dsZS5jb21cIix1cGRhdGVkdXJsOlwid3d3LnlvdXR1YmUuY29tXCJ9KVxuICAvLyAgICAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAvLyAgICAgICAgICAgLmV4cGVjdCgyMDAsIGRvbmUpO1xuICAvLyAgIH0pO1xuICAvLyB9KTtcblxuXG4gIC8vIFRlc3QgY2FzZSBmb3IgZGVsZXRlIGZ1bmN0aW9uXG4gIC8vIGRlc2NyaWJlKCdEZWxldGUnLCBmdW5jdGlvbigpIHtcbiAgLy8gICBpdCgnRGVsZXRlIHJlcWllc3QgcmVjaWV2ZWQgYW5kIHJlc3BvbmRzIHdpdGgganNvbicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgLy8gICAgIHJlcXVlc3QoYXBwKVxuXG4gIC8vICAgICAgICAgICAuZGVsZXRlKCcvOlwid3d3LnlvdXR1YmUuY29tXCInKVxuICAvLyAgICAgICAgICAgLnNlbmQoKVxuICAvLyAgICAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAvLyAgICAgICAgICAgLmV4cGVjdCgyMDAsIGRvbmUpO1xuICAvLyAgIH0pO1xuICAvLyB9KTtcblxuICAvLyBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb24iXX0=