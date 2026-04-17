export async function onRequestPost(context: any) {
  const { request } = context;
  
  try {
    const data = await request.json();
    const { name, email, organization, message } = data;
    
    if (!name || !email || !organization || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "All fields are required" 
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Inquiry received successfully" 
    }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server error" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}