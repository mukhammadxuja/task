"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { v4 as uuidv4 } from "uuid"

interface Block {
  id: string
  type: string
  x: number
  y: number
  w: number
  h: number
}

interface AppContextType {
  blocks: Block[]
  addBlock: ({ type, w, h }: { type: string; w: number; h: number }) => void
  updateBlock: (id: string, updates: Partial<Block>) => void
  removeBlock: (id: string) => void
}

// default context value
const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }
  return context
}

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<Block[]>(() => {
    const stored = localStorage.getItem("blocks")
    return stored ? JSON.parse(stored) : []
  })

  console.log(blocks)

  const addBlock = ({ type, w, h }: { type: string; w: number; h: number }) => {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      x: 0,
      y: Infinity,
      w: w ?? 0,
      h: h ?? 0,
    }

    setBlocks((prev) => {
      const updatedBlocks = [...prev, newBlock]
      localStorage.setItem("blocks", JSON.stringify(updatedBlocks))
      return updatedBlocks
    })
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks((prev) => {
      const updatedBlocks = prev.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      )

      if (updates.w || updates.h) {
        localStorage.setItem("blocks", JSON.stringify(updatedBlocks))
      }

      return updatedBlocks
    })
  }

  const removeBlock = (id: string) => {
    setBlocks((prev) => {
      const updatedBlocks = prev.filter((block) => block.id !== id)
      localStorage.setItem("blocks", JSON.stringify(updatedBlocks))
      return updatedBlocks
    })
  }

  useEffect(() => {
    const handleResize = () => {
      setBlocks((prev) => {
        const updatedBlocks = prev.map((block) => {
          return { ...block }
        })

        localStorage.setItem("blocks", JSON.stringify(updatedBlocks))

        return updatedBlocks
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <AppContext.Provider value={{ blocks, addBlock, updateBlock, removeBlock }}>
      {children}
    </AppContext.Provider>
  )
}
