// Utilitários para manipulação de datas
export const dateUtils = {
  // Formatar data para padrão brasileiro
  formatToBrazilian: (date) => {
    if (!date) return ''
    if (typeof date === 'string') {
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
    return date.toLocaleDateString('pt-BR')
  },

  // Converter data brasileira para formato ISO
  fromBrazilianToISO: (brazilianDate) => {
    if (!brazilianDate) return ''
    const [day, month, year] = brazilianDate.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  },

  // Obter mês e ano atual
  getCurrentMonthYear: () => {
    const now = new Date()
    return {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      monthName: now.toLocaleDateString('pt-BR', { month: 'long' }),
      fullName: now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    }
  },

  // Verificar se uma data está no mês atual
  isCurrentMonth: (dateString, currentMonth) => {
    if (!dateString || !currentMonth) return false
    const [day, month, year] = dateString.split('/')
    const targetMonth = currentMonth.getMonth() + 1
    const targetYear = currentMonth.getFullYear()
    return parseInt(month) === targetMonth && parseInt(year) === targetYear
  },

  // Adicionar meses a uma data
  addMonths: (date, months) => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + months)
    return newDate
  },

  // Calcular mês de término de parcelamento
  calculateEndMonth: (startDate, parcelas) => {
    if (!startDate || !parcelas) return ''
    const [day, month, year] = startDate.split('/')
    const startDateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    const endDate = dateUtils.addMonths(startDateObj, parcelas - 1)
    return endDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  },

  // Verificar se deve iniciar no próximo mês baseado na data de fechamento
  shouldStartNextMonth: (purchaseDate, bankName) => {
    const closingDates = {
      'Bradesco': 5,
      'Nubank': 5,
      'Itaú': 28
    }
    
    const closingDay = closingDates[bankName] || 28
    const [day] = purchaseDate.split('/')
    
    return parseInt(day) >= closingDay
  }
  ,

  // Formatar mês e ano (ex: agosto de 2025)
  formatarMesAno: (date) => {
    if (!date) return ''
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }

}