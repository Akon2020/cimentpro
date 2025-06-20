export const getAllUsers = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/agents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await res.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}


export const getSingleUser = async (id: number) => {
    try {
        const req = await fetch(`http://localhost:3000/api/agents/${id}`);
        const res = await req.json();
        console.log("Single User", res);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const createUser = async (userData: any) => {
    try {
        const res = await fetch(`http://localhost:3000/api/agents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create user');
    }
}

export const updateUser = async (id: number, userData: any) => {
    try {
        const res = await fetch(`http://localhost:3000/api/agents/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to update user with ID: ${id}`);
    }
}

export const deleteUser = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:3000/api/agents/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 204) {
            return { success: true, message: `User with ID ${id} deleted successfully.` };
        }
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to delete user with ID: ${id}`);
    }
}