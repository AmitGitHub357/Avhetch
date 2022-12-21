import React from 'react'

const Cancellation = () => {
    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form onSubmit={submitHandler}>
         
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Cancellation Remarks</Form.Label>
                <Form.Control required type="text" placeholder="Remarks" value={cancellationRemarks} onChange={(e) => setCancellationRemarks(e.target.value)}/>
              </Form.Group>
            </Col> 
          </Row>       
          <div className="mt-3">
            <Button variant="primary" type="submit">Save</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>

            
        
    )
}

export default Cancellation
