import { createClient } from '@supabase/supabase-js'

// 1. As chaves agora são lidas de variáveis de ambiente para maior segurança.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validação para garantir que as variáveis foram carregadas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in environment variables.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Função auxiliar para tratamento de erros
function handleSupabaseError({ error, context }) {
  if (error) {
    // 2. Erro é logado no console com mais detalhes antes de ser lançado.
    console.error(`Error in ${context}:`, error.message)
    throw error
  }
}

// Funções auxiliares para operações do banco
export const supabaseService = {
  // Rendas
  async getRendas() {
    const { data, error } = await supabase
      .from('rendas')
      .select('*')
      .order('created_at', { ascending: false })
    
    handleSupabaseError({ error, context: 'getRendas' })
    return data || []
  },

  async addRenda(renda) {
    const { data, error } = await supabase
      .from('rendas')
      .insert([renda])
      .select()
      .single() // Usar .single() para retornar um objeto, não um array
    
    handleSupabaseError({ error, context: 'addRenda' })
    return data
  },

  // Despesas
  async getDespesas() {
    const { data, error } = await supabase
      .from('despesas')
      .select('*')
      .order('created_at', { ascending: false })
    
    handleSupabaseError({ error, context: 'getDespesas' })
    return data || []
  },

  async addDespesa(despesa) {
    const { data, error } = await supabase
      .from('despesas')
      .insert([despesa])
      .select()
      .single()
    
    handleSupabaseError({ error, context: 'addDespesa' })
    return data
  },

  async updateDespesa(id, updates) {
    const { data, error } = await supabase
      .from('despesas')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    handleSupabaseError({ error, context: 'updateDespesa' })
    return data
  },

  async deleteDespesa(id) {
    const { error } = await supabase
      .from('despesas')
      .delete()
      .eq('id', id)
    
    handleSupabaseError({ error, context: 'deleteDespesa' })
    // Delete não retorna dados importantes, então não precisamos retornar nada
  },

  // Pedidos de compra
  async getPedidos() {
    const { data, error } = await supabase
      .from('pedidos_compra')
      .select('*')
      .order('created_at', { ascending: false })
    
    handleSupabaseError({ error, context: 'getPedidos' })
    return data || []
  },

  async addPedido(pedido) {
    const { data, error } = await supabase
      .from('pedidos_compra')
      .insert([pedido])
      .select()
      .single()
      
    handleSupabaseError({ error, context: 'addPedido' })
    return data
  },

  async updatePedido(id, updates) {
    const { data, error } = await supabase
      .from('pedidos_compra')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    handleSupabaseError({ error, context: 'updatePedido' })
    return data
  },

  async deletePedido(id) {
    const { error } = await supabase
      .from('pedidos_compra')
      .delete()
      .eq('id', id)
    
    handleSupabaseError({ error, context: 'deletePedido' })
  },

  // Função para limpar todos os dados
  async clearAllData() {
    try {
      // 3. Comentário explicando a lógica de deleção
      // Usamos .neq('id', 0) como um truque para deletar todas as linhas,
      // pois o Supabase pode restringir deleções sem um filtro 'where' por segurança.
      await supabase.from('rendas').delete().neq('id', 0)
      await supabase.from('despesas').delete().neq('id', 0)
      await supabase.from('pedidos_compra').delete().neq('id', 0)
      
      return { success: true }
    } catch (error) {
      console.error('Erro ao limpar dados:', error)
      throw error
    }
  }
}