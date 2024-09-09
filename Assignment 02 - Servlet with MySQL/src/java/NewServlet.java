///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
// */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import jakarta.servlet.annotation.WebServlet;
import com.google.gson.Gson;
import java.net.URLDecoder;

/**
 *
 * @author arthe
 */
@WebServlet(urlPatterns = {"/NewServlet"})
public class NewServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
        protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        
        String action = request.getParameter("action");
        if (action == null) {
         response.getWriter().println("{\"error\":\"Action parameter is missing\"}");
         return;
        
}
        String url="jdbc:mysql://localhost:3306/products";
        String username="root";
        String password="Arthey@1274";
         
        Connection conn=null;
        PreparedStatement stmt=null;
       
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn=DriverManager.getConnection(url,username,password);
            StringBuilder json = new StringBuilder();
            System.out.print("hii");
            switch(action)
            {
                case "get":
                    System.out.println("hii");
                    String fetchAllSql = "SELECT id, name, category, price, stock FROM products";
                    stmt = conn.prepareStatement(fetchAllSql);
                    ResultSet rs = stmt.executeQuery();
                    json.append("[");
                    while(rs.next())
                    {
                        if(json.length()>1){
                            json.append(",");
                        }
                         json.append(String.format("{\"id\":%d, \"name\":\"%s\", \"category\":\"%s\", \"price\":\"%s\", \"stock\":%d}",
                            rs.getInt("id"),
                            rs.getString("name"),
                            rs.getString("category"),
                            rs.getBigDecimal("price"),
                            rs.getInt("stock")));
                    }
                     json.append("]");
                     response.getWriter().write(json.toString());
                     break;
                case "post":
                   
                    StringBuilder requestBody=new StringBuilder();
                    
                    String name = request.getParameter("name");
                    String category = request.getParameter("category");
                    String price = request.getParameter("price");
                    String stock = request.getParameter("stock");
                    response.getWriter().println(request);
                    response.getWriter().println(name+category+price+stock);
                    String insertSql="Insert into products (name,category,price,stock)values(?,?,?,?)";
                    stmt = conn.prepareStatement(insertSql);
                    stmt.setString(1, name);
                    stmt.setString(2, category);
                    stmt.setBigDecimal(3, new BigDecimal(price));
                    stmt.setInt(4, Integer.parseInt(stock));
                   
                    
                    
                    
                       int rowsInserted = stmt.executeUpdate();
                       if (rowsInserted > 0) {
                               response.getWriter().println("{\"success\":\"Product added successfully\"}");
                      } else {
                            response.getWriter().println("{\"error\":\"Failed to add product\"}");
        }               break; 
                case "delete":
                      String idToDelete = request.getParameter("id");
                      if(idToDelete!=null)
                      {
                          String deleteSql="DELETE FROM products WHERE id = ?";
                           stmt = conn.prepareStatement(deleteSql);
                           stmt.setInt(1, Integer.parseInt(idToDelete));
                           int rowsDeleted = stmt.executeUpdate();
                           if (rowsDeleted > 0) {
                        response.getWriter().println("{\"success\":\"Product deleted successfully\"}");
                    } else {
                        response.getWriter().println("{\"error\":\"Failed to delete product\"}");
                    }
                      }
                  break;
                  
//   

             case "update":
                BufferedReader reader = request.getReader();
                requestBody = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    requestBody.append(line);
                }
                reader.close();

                String[] params = requestBody.toString().split("&");
                String idToUpdate = null, updatedName = null, updatedCategory = null, updatedPrice = null, updatedStock = null;
                for (String param : params) {
                    String[] keyValue = param.split("=");
                    if (keyValue.length == 2) {
                        String key = keyValue[0];
                        String value = URLDecoder.decode(keyValue[1], "UTF-8"); // Decode URL-encoded value
                        switch (key) {
                            case "id":
                                idToUpdate = value;
                                break;
                            case "name":
                                updatedName = value;
                                break;
                            case "category":
                                updatedCategory = value;
                                break;
                            case "price":
                                updatedPrice = value;
                                break;
                            case "stock":
                                updatedStock = value;
                                break;
                        }
                    }
                }

                String updateSql = "UPDATE products SET name = ?, category = ?, price = ?, stock = ? WHERE id = ?";
                stmt = conn.prepareStatement(updateSql);
                stmt.setString(1, updatedName);
                stmt.setString(2, updatedCategory);
                stmt.setBigDecimal(3, new BigDecimal(updatedPrice));
                stmt.setInt(4, Integer.parseInt(updatedStock));
                stmt.setInt(5, Integer.parseInt(idToUpdate));

                int rowsUpdated = stmt.executeUpdate();
                if (rowsUpdated > 0) {
                    response.getWriter().println("{\"success\":\"Product updated successfully\"}");
                } else {
                    response.getWriter().println("{\"error\":\"Failed to update product\"}");
                }
                break;
                
            }
            
    }
   catch (SQLException e) {
    e.printStackTrace();
    response.getWriter().println("SQL Error: " + e.getMessage());
} 
  catch (NumberFormatException e) {
    e.printStackTrace();
    response.getWriter().println("Number Format Error: " + e.getMessage());
} 
 catch (Exception e) {
    e.printStackTrace();
    response.getWriter().println("General Error: " + e.getMessage());
}
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
@Override
protected void doDelete(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    processRequest(request, response);
}
@Override
protected void doPut(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    processRequest(request, response);
}

}

