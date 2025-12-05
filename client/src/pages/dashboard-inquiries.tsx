
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, Reply, CheckCircle2, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const inquiries = [
  {
    id: "INQ-001",
    customer: "Neha Kapoor",
    product: "Kundan Bridal Necklace",
    message: "Is this available in different colors? I need it for my wedding in March.",
    status: "pending",
    date: "2024-01-15",
    priority: "high",
  },
  {
    id: "INQ-002",
    customer: "Arjun Malhotra",
    product: "Diamond Solitaire Ring",
    message: "Can you provide certification for the diamond? What's the clarity grade?",
    status: "replied",
    date: "2024-01-14",
    priority: "medium",
  },
  {
    id: "INQ-003",
    customer: "Sanya Gupta",
    product: "Temple Gold Earrings",
    message: "Do you ship to the USA? What are the shipping charges?",
    status: "pending",
    date: "2024-01-13",
    priority: "low",
  },
  {
    id: "INQ-004",
    customer: "Rohan Joshi",
    product: "Polki Choker Set",
    message: "Is customization available? I want to add some emeralds.",
    status: "replied",
    date: "2024-01-12",
    priority: "high",
  },
];

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500",
  replied: "bg-green-500/10 text-green-500",
  closed: "bg-gray-500/10 text-gray-500",
};

const priorityColors = {
  high: "bg-red-500/10 text-red-500",
  medium: "bg-orange-500/10 text-orange-500",
  low: "bg-blue-500/10 text-blue-500",
};

export default function DashboardInquiries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [replyMessage, setReplyMessage] = useState("");

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      searchQuery === "" ||
      inquiry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.product.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Inquiries</h1>
        <p className="text-muted-foreground">
          Manage customer inquiries and questions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inquiries</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Replied</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Inquiries List */}
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{inquiry.id}</h3>
                        <Badge className={statusColors[inquiry.status as keyof typeof statusColors]}>
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </Badge>
                        <Badge className={priorityColors[inquiry.priority as keyof typeof priorityColors]}>
                          {inquiry.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        From: <span className="font-medium text-foreground">{inquiry.customer}</span>
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Product: <span className="font-medium text-foreground">{inquiry.product}</span>
                      </p>
                      <p className="text-sm">{inquiry.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{inquiry.date}</p>
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="gap-2">
                            <Reply className="h-4 w-4" />
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reply to {inquiry.customer}</DialogTitle>
                            <DialogDescription>
                              Replying to inquiry about {inquiry.product}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium mb-2">Original Message:</p>
                              <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                                {inquiry.message}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-2">Your Reply:</p>
                              <Textarea
                                placeholder="Type your reply here..."
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                rows={6}
                              />
                            </div>
                            <Button className="w-full">Send Reply</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
