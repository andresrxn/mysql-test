
import DB from "../db.js"

const TABLE_FIELDS = ["firstname", "lastname", "salary"]

export const getEmployees = async (req, res) => {
   const employeesQuery = await DB.query("SELECT * FROM employees")
   const employees = employeesQuery[0]

   if (employees.length !== 0) {
      return res.json(employees)
   }

   res.send("No results found")
}


export const getEmployee = async (req, res) => {
   const id = parseInt(req.params.id)
   if (typeof id === 'number') {
      const employeesQuery = await DB.query(`SELECT * FROM employees WHERE id = ?`, [id])
      const employee = employeesQuery[0]

      if (employee.length !== 0) {
         return res.json(employee)
      }

      res.send("No results found")
   }

   res.send("Not a valid id")
}

export const createEmployee = async (req, res) => {

   const fields = Object.keys(req.body);
   for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (!TABLE_FIELDS.includes(field)) {
         return res.send("Set all params"); // Esto finaliza la función
      }
   }

   const { firstname, lastname, salary } = req.body;

   try {
      const employeesQuery = await DB.query(`
      INSERT INTO employees(firstname, lastname, salary) 
      VALUES(? ,?, ?)`,
         [firstname, lastname, salary])

      //[result] console.log(result, result.affectedRows, result.fieldCount, result.insertId, result.affectedRows, result.serverStatus);

      res.json({ error: 0, message: "Added new employee" })

   } catch (error) {

      console.error(error);
      res.status(500).json({ error: 1, message: 'Error adding the employee' });

   }

}

export const updateEmployee = async (req, res) => {
   const id = parseInt(req.params.id)
   if (typeof id === 'number') {


      const fields = Object.keys(req.body);
      for (let i = 0; i < fields.length; i++) {
         const field = fields[i];
         if (!TABLE_FIELDS.includes(field)) {
            return res.send("Set all params");
         }
      }

      const { firstname, lastname, salary } = req.body;

      try {

         const employeesQuery = await DB.query(`UPDATE employees SET firstname = ?, lastname = ?, salary = ? WHERE id = ?`, [firstname, lastname, salary, id])
         return res.json({ error: 0, message: `Updated employee ${id}` })

      } catch (error) {

         console.error(error);
         res.status(500).json({ error: 1, message: 'Error updating the employee' });

      }
   }

   res.send("Not a valid id")
}

export const updatePartialEmployee = async (req, res) => {
   const id = parseInt(req.params.id)
   if (typeof id === 'number') {

      let updatedFields = {}

      const fields = Object.keys(req.body);
      fields.forEach(field => {
         if (TABLE_FIELDS.includes(field)) {
            updatedFields[field] = req.body[field]
         }
      })

      try {

         const employeesQuery = await DB.query(`UPDATE employees SET ? WHERE id = ?`, [updatedFields, id])

         return res.json({ error: 0, message: `Updated employee ${id}` })

      } catch (error) {

         console.error(error);
         res.status(500).json({ error: 1, message: 'Error updating the employee' });

      }
   }

   res.send("Not a valid id")
}

export const deleteEmployee = async (req, res) => {
   const id = parseInt(req.params.id)
   if (typeof id === 'number') {
      try {

         const employeesQuery = await DB.query(`DELETE FROM employees WHERE id = ?`, [id])
         return res.json({ error: 0, message: `Deleted employee ${id}` })

      } catch (error) {

         console.error(error);
         res.status(500).json({ error: 1, message: 'Error deleting the employee' });

      }
   }

   res.send("Not a valid id")

}


